import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { AuthModal } from '@/components/AuthModal';
import { IdeaForm } from '@/components/IdeaForm';
import { IdeasBoard } from '@/components/IdeasBoard';
import { LogOut } from 'lucide-react';

const Index = () => {
  const { user, signOut, loading } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleIdeaSubmitted = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-primary-foreground">AT</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">AlpacaTech</h1>
            <p className="text-muted-foreground max-w-2xl">
              ¡Ayúdanos a crear el contenido que quieres ver! Envía tus ideas para vídeos y vota por las propuestas que más te gusten.
            </p>
          </div>
          
          <div className="flex justify-center">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  Bienvenido, {user.email}
                </span>
                <Button onClick={signOut} variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar sesión
                </Button>
              </div>
            ) : (
              <Button onClick={() => setAuthModalOpen(true)}>
                Iniciar sesión para enviar ideas
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-1">
            {user ? (
              <IdeaForm onIdeaSubmitted={handleIdeaSubmitted} />
            ) : (
              <div className="bg-muted/50 border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                <h3 className="text-lg font-medium mb-2">¿Tienes una idea?</h3>
                <p className="text-muted-foreground mb-4">
                  Inicia sesión para enviar tus propuestas de vídeos
                </p>
                <Button onClick={() => setAuthModalOpen(true)}>
                  Iniciar sesión
                </Button>
              </div>
            )}
          </div>

          {/* Right Column - Ideas Board */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Ideas de la comunidad</h2>
              <p className="text-muted-foreground">
                Vota por las ideas que más te gusten para que tengan prioridad
              </p>
            </div>
            <IdeasBoard refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </main>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  );
};

export default Index;
