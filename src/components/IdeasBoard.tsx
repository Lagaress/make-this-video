import { useState, useEffect } from 'react';
import { IdeaCard } from './IdeaCard';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface Idea {
  id: string;
  title: string;
  description: string;
  reference_links: string[] | null;
  created_at: string;
  user_id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
}

interface IdeaWithVotes extends Idea {
  vote_count: number;
  user_has_voted: boolean;
}

interface IdeasBoardProps {
  refreshTrigger: number;
  onOpenAuthModal: () => void;
}

export const IdeasBoard = ({ refreshTrigger, onOpenAuthModal }: IdeasBoardProps) => {
  const { user } = useAuth();
  const [ideas, setIdeas] = useState<IdeaWithVotes[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchIdeas = async () => {
    try {
      // Get ideas with vote counts
      const { data: ideasData, error: ideasError } = await supabase
        .from('ideas')
        .select(`
          id,
          title,
          description,
          reference_links,
          created_at,
          user_id,
          status
        `)
        .order('created_at', { ascending: false });

      if (ideasError) throw ideasError;

      // Get vote counts for each idea
      const { data: votesData, error: votesError } = await supabase
        .from('votes')
        .select('idea_id, user_id');

      if (votesError) throw votesError;

      // Process the data
      const ideasWithVotes: IdeaWithVotes[] = ideasData.map(idea => {
        const ideaVotes = votesData.filter(vote => vote.idea_id === idea.id);
        const voteCount = ideaVotes.length;
        const userHasVoted = user ? ideaVotes.some(vote => vote.user_id === user.id) : false;

        return {
          ...idea,
          vote_count: voteCount,
          user_has_voted: userHasVoted,
        };
      });

      // Sort by vote count (highest first), then by creation date (newest first)
      ideasWithVotes.sort((a, b) => {
        if (a.vote_count !== b.vote_count) {
          return b.vote_count - a.vote_count;
        }
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });

      setIdeas(ideasWithVotes);
    } catch (error) {
      console.error('Error fetching ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, [refreshTrigger, user]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (ideas.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No hay ideas todavía</h3>
        <p className="text-muted-foreground">
          ¡Sé el primero en enviar una idea para un vídeo de AlpacaTech!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {ideas.map((idea) => (
        <IdeaCard
          key={idea.id}
          idea={idea}
          voteCount={idea.vote_count}
          hasUserVoted={idea.user_has_voted}
          onVoteChange={fetchIdeas}
          onOpenAuthModal={onOpenAuthModal}
        />
      ))}
    </div>
  );
};