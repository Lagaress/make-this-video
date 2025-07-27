import { Button } from '@/components/ui/button';
import { Footer } from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link to="/">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al inicio
              </Button>
            </Link>
            <h1 className="text-4xl font-bold mb-4">Política de Privacidad</h1>
            <p className="text-muted-foreground">
              Última actualización: {new Date().toLocaleDateString('es-ES')}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Información que recopilamos</h2>
              <p className="mb-4">
                En AlpacaTech recopilamos la siguiente información cuando utilizas nuestro servicio:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Dirección de correo electrónico cuando te registras</li>
                <li>Ideas y contenido que envías a través de nuestro formulario</li>
                <li>Información de votación en las ideas de la comunidad</li>
                <li>Datos de autenticación cuando utilizas Google para iniciar sesión</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Cómo utilizamos tu información</h2>
              <p className="mb-4">
                Utilizamos la información recopilada para:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Proporcionar y mejorar nuestros servicios</li>
                <li>Gestionar tu cuenta y autenticación</li>
                <li>Enviarte comunicaciones relacionadas con el servicio</li>
                <li>Crear contenido basado en las ideas de la comunidad</li>
                <li>Mantener la seguridad de la plataforma</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Comunicaciones por correo electrónico</h2>
              <p className="mb-4">
                Al registrarte y aceptar nuestros términos, consientes recibir:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Notificaciones sobre el estado de tus ideas enviadas</li>
                <li>Actualizaciones sobre nuevos vídeos basados en ideas de la comunidad</li>
                <li>Información sobre nuevas funcionalidades del servicio</li>
                <li>Comunicaciones promocionales ocasionales</li>
              </ul>
              <p className="mt-4">
                Puedes darte de baja de estas comunicaciones en cualquier momento contactándonos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Compartir información</h2>
              <p className="mb-4">
                No vendemos, alquilamos ni compartimos tu información personal con terceros, excepto:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Las ideas que envías serán públicas y visibles para otros usuarios</li>
                <li>Cuando sea requerido por ley</li>
                <li>Para proteger nuestros derechos legales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Seguridad de los datos</h2>
              <p>
                Implementamos medidas de seguridad apropiadas para proteger tu información personal 
                contra acceso no autorizado, alteración, divulgación o destrucción. Utilizamos 
                servicios seguros de terceros como Supabase para el almacenamiento de datos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Tus derechos</h2>
              <p className="mb-4">
                Tienes derecho a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Acceder a tu información personal</li>
                <li>Rectificar datos incorrectos</li>
                <li>Eliminar tu cuenta y datos asociados</li>
                <li>Portabilidad de tus datos</li>
                <li>Oponerte al procesamiento de tus datos</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Cookies y tecnologías similares</h2>
              <p>
                Utilizamos cookies y tecnologías similares para mejorar tu experiencia, 
                mantener tu sesión iniciada y analizar el uso de nuestro servicio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Cambios en esta política</h2>
              <p>
                Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos 
                sobre cambios importantes por correo electrónico o mediante un aviso en nuestro servicio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Contacto</h2>
              <p>
                Si tienes preguntas sobre esta Política de Privacidad o quieres ejercer tus derechos, 
                puedes contactarnos en nuestras redes sociales o a través del formulario de ideas 
                especificando que es una consulta sobre privacidad.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;