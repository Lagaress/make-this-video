export const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-sm text-muted-foreground">
          <p>
            © 2024 AlpacaTech. Todos los derechos reservados. 
            <a 
              href="/privacy" 
              className="ml-2 text-primary hover:underline"
            >
              Política de Privacidad
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};