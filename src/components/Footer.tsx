export const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-sm text-muted-foreground">
          <p>
            © 2025{" "}
            <a
              href="https://www.youtube.com/@alpacatech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              AlpacaTech
            </a>
            . Todos los derechos reservados. 
            <br />
            <a 
              href="/privacy" 
              className="hover:underline"
            >
              Política de Privacidad
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};