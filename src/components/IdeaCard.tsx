import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUp, ExternalLink } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface Idea {
  id: string;
  title: string;
  description: string;
  reference_links: string[] | null;
  created_at: string;
  user_id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
}

interface IdeaCardProps {
  idea: Idea;
  voteCount: number;
  hasUserVoted: boolean;
  onVoteChange: () => void;
}

export const IdeaCard = ({ idea, voteCount, hasUserVoted, onVoteChange }: IdeaCardProps) => {
  const { user, isAdmin } = useAuth();
  const [voting, setVoting] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(idea.status);

  const updateStatus = async (newStatus: string) => {
    const validStatus = newStatus as 'pending' | 'in_progress' | 'completed' | 'rejected';
    
    try {
      const { error } = await supabase
        .from('ideas')
        .update({ status: validStatus })
        .eq('id', idea.id);

      if (error) throw error;

      setCurrentStatus(validStatus);
      toast({
        title: "Estado actualizado",
        description: `La idea ha sido marcada como ${getStatusLabel(newStatus)}`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado de la idea",
        variant: "destructive",
      });
    }
  };

  const handleVote = async () => {
    if (!user) {
      toast({
        title: "Inicia sesión",
        description: "Necesitas iniciar sesión para votar.",
        variant: "destructive",
      });
      return;
    }

    setVoting(true);
    
    try {
      if (hasUserVoted) {
        // Remove vote
        const { error } = await supabase
          .from('votes')
          .delete()
          .eq('idea_id', idea.id)
          .eq('user_id', user.id);
          
        if (error) throw error;
      } else {
        // Add vote
        const { error } = await supabase
          .from('votes')
          .insert({
            idea_id: idea.id,
            user_id: user.id,
          });
          
        if (error) throw error;
      }
      
      onVoteChange();
    } catch (error: any) {
      toast({
        title: "Error al votar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setVoting(false);
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'in_progress':
        return 'En progreso';
      case 'completed':
        return 'Completado';
      case 'rejected':
        return 'Rechazado';
      default:
        return 'Pendiente';
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'pending':
        return 'secondary';
      case 'in_progress':
        return 'default';
      case 'completed':
        return 'outline';
      case 'rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="text-lg leading-tight">{idea.title}</CardTitle>
          <div className="flex flex-col gap-2 shrink-0">
            {/* Estado - Badge para usuarios, Select para admins */}
            {isAdmin ? (
              <Select value={currentStatus} onValueChange={updateStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="in_progress">En progreso</SelectItem>
                  <SelectItem value="completed">Completado</SelectItem>
                  <SelectItem value="rejected">Rechazado</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Badge variant={getStatusVariant(currentStatus)}>
                {getStatusLabel(currentStatus)}
              </Badge>
            )}
            <Badge variant="secondary">
              {formatDate(idea.created_at)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground mb-4">{idea.description}</p>
        
        {idea.reference_links && idea.reference_links.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Enlaces de referencia:</p>
            {idea.reference_links.map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <ExternalLink className="h-3 w-3" />
                {link}
              </a>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        {/* Solo mostrar votación para usuarios regulares */}
        {!isAdmin && (
          <Button
            variant={hasUserVoted ? "default" : "outline"}
            size="sm"
            onClick={handleVote}
            disabled={voting}
            className="flex items-center gap-2"
          >
            <ArrowUp className="h-4 w-4" />
            {voteCount} {voteCount === 1 ? 'voto' : 'votos'}
          </Button>
        )}
        
        {/* Mensaje para admins */}
        {isAdmin && (
          <div className="text-sm text-muted-foreground">
            Gestión administrativa - {voteCount} {voteCount === 1 ? 'voto' : 'votos'}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};