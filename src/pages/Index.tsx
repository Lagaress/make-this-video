import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { AuthModal } from '@/components/AuthModal';
import { IdeaForm } from '@/components/IdeaForm';
import { IdeasBoard } from '@/components/IdeasBoard';
import { Footer } from '@/components/Footer';
import { LogOut } from 'lucide-react';

const Index = () => {
  const { user, signOut, loading, isAdmin } = useAuth();
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
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-full">
          {/* Left Column - Channel Info + Form */}
          <div className="space-y-6">
            {/* Channel Header */}
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-foreground">AT</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">AlpacaTech</h1>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                ¡Ayúdanos a crear el contenido que quieres ver! Envía tus ideas para vídeos y vota por las propuestas que más te gusten.
              </p>
              
              {/* Auth section */}
              {user && (
                <div className="flex items-center justify-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    Bienvenido, {user.email}
                  </span>
                  <Button onClick={signOut} variant="outline" size="sm">
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar sesión
                  </Button>
                </div>
              )}
            </div>

            {/* Form Section - Solo para usuarios regulares */}
            {!isAdmin && (
              <IdeaForm onIdeaSubmitted={handleIdeaSubmitted} onOpenAuthModal={() => setAuthModalOpen(true)} />
            )}
            
            {/* Admin message */}
            {isAdmin && (
              <div className="text-center p-6 bg-muted/50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Panel de Administración</h3>
                <p className="text-muted-foreground">
                  Como administrador, puedes gestionar el estado de las ideas desde la lista de la derecha.
                </p>
              </div>
            )}
          </div>

          {/* Right Column - Ideas Board */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ideas de la comunidad</h2>
              <p className="text-muted-foreground">
                Vota por las ideas que más te gusten para que tengan prioridad
              </p>
            </div>
            <IdeasBoard refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </div>

      <Footer />
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  );
};

export default Index;
