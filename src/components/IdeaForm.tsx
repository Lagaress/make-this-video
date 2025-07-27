import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { Plus, X } from 'lucide-react';

interface IdeaFormProps {
  onIdeaSubmitted: () => void;
  onOpenAuthModal: () => void;
}

export const IdeaForm = ({ onIdeaSubmitted, onOpenAuthModal }: IdeaFormProps) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [links, setLinks] = useState<string[]>(['']);
  const [submitting, setSubmitting] = useState(false);

  const addLinkField = () => {
    setLinks([...links, '']);
  };

  const removeLinkField = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const updateLink = (index: number, value: string) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Si el usuario no está logueado, abrir modal de auth
    if (!user) {
      onOpenAuthModal();
      return;
    }

    setSubmitting(true);
    
    try {
      const validLinks = links.filter(link => link.trim() !== '');
      
      const { error } = await supabase
        .from('ideas')
        .insert({
          title: title.trim(),
          description: description.trim(),
          reference_links: validLinks.length > 0 ? validLinks : null,
          user_id: user.id,
        });

      if (error) throw error;

      toast({
        title: "¡Idea enviada!",
        description: "Tu idea ha sido publicada correctamente.",
      });

      // Reset form
      setTitle('');
      setDescription('');
      setLinks(['']);
      onIdeaSubmitted();
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error inesperado';
      toast({
        title: "Error al enviar la idea",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>¿Qué vídeo quieres?</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título*</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Tutorial de React con Hooks"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descripción*</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ej: Me gustaría un tutorial paso a paso sobre cómo crear un sistema de autenticación completo en React. Sería genial que cubra desde la configuración inicial hasta la implementación de login, registro y protección de rutas. Muchos desarrolladores tenemos dudas sobre las mejores prácticas y este tema siempre genera interés."
              rows={4}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>Enlaces de referencia (opcional)</Label>
            {links.map((link, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={link}
                  onChange={(e) => updateLink(index, e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  type="url"
                />
                {links.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeLinkField(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addLinkField}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Añadir enlace
            </Button>
          </div>
          
          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? 'Enviando...' : 'Enviar idea'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};