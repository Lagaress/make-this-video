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
          <div className="max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Introducción</h2>
              <p className="text-muted-foreground leading-relaxed">
                Bienvenido a AlpacaTech ("nosotros", "nuestro" o "nos"). Esta política de privacidad 
                explica cómo recopilamos, utilizamos, divulgamos y protegemos tu información cuando 
                utilizas nuestro sitio web y servicios. Por favor, lee esta política de privacidad 
                cuidadosamente. Al utilizar nuestros servicios, aceptas la recopilación y uso de 
                información de acuerdo con esta política.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Datos que recopilamos</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Recopilamos varios tipos diferentes de información para diversos propósitos 
                para proporcionar y mejorar nuestro servicio:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground">
                <li><strong>Datos de autenticación:</strong> Cuando inicias sesión usando Google OAuth, 
                recibimos información de tu cuenta de Google incluyendo tu nombre, dirección de 
                correo electrónico y foto de perfil.</li>
                <li><strong>Contenido del usuario:</strong> Ideas y contenido que envías a través 
                de nuestro formulario, así como tus votos en las ideas de la comunidad.</li>
                <li><strong>Datos técnicos:</strong> Recopilamos tipo de navegador, dirección IP, 
                información del dispositivo, sistema operativo y otros detalles técnicos a través 
                de nuestros proveedores de hosting.</li>
                <li><strong>Datos de uso:</strong> Información sobre cómo interactúas con nuestro 
                servicio, incluyendo funciones utilizadas y tiempo empleado.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Proveedores de servicios externos</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Utilizamos varios servicios de terceros para operar nuestra plataforma:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground">
                <li><strong>Google OAuth:</strong> Para autenticación de usuarios (proporcionado por Google Ireland Limited para usuarios del EEE, y Google LLC para otros)</li>
                <li><strong>Supabase:</strong> Para almacenamiento de base de datos y autenticación</li>
                <li><strong>Vercel:</strong> Para hosting del sitio web y análisis</li>
                <li><strong>Google Fonts:</strong> Para entrega de fuentes web</li>
              </ul>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Estos servicios pueden recopilar, usar y compartir tu información para proporcionar 
                sus servicios. Recomendamos revisar sus respectivas políticas de privacidad para 
                más información.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Cómo utilizamos tus datos</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Solo utilizaremos tus datos personales cuando la ley nos lo permita. Más comúnmente, 
                utilizaremos tus datos personales en las siguientes circunstancias:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground">
                <li>Donde necesitamos cumplir el contrato que estamos a punto de celebrar o hemos celebrado contigo</li>
                <li>Donde es necesario para nuestros intereses legítimos (o los de un tercero) y tus intereses y derechos fundamentales no anulan esos intereses</li>
                <li>Donde necesitamos cumplir con una obligación legal</li>
                <li>Para proporcionar y mejorar nuestros servicios</li>
                <li>Para gestionar tu cuenta y autenticación</li>
                <li>Para crear contenido basado en las ideas de la comunidad</li>
                <li><strong>Para notificarte cuando tu idea propuesta haya sido desarrollada en un vídeo</strong></li>
                <li>Para mantener la seguridad de la plataforma</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Seguridad de los datos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Hemos implementado medidas de seguridad apropiadas para prevenir que tus datos 
                personales sean perdidos accidentalmente, utilizados o accedidos de manera no 
                autorizada, alterados o divulgados. Además, limitamos el acceso a tus datos 
                personales a aquellos empleados, agentes, contratistas y otros terceros que 
                tienen una necesidad comercial de conocerlos. Utilizamos servicios seguros de 
                terceros como Supabase para el almacenamiento de datos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Transferencias internacionales de datos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Tu información puede ser transferida y procesada en países distintos al de tu 
                residencia. Estos países pueden tener leyes de protección de datos diferentes. 
                Cuando transferimos tus datos, nos aseguramos de que se implementen las salvaguardias 
                apropiadas para proteger tu información.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Tus derechos legales</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Bajo ciertas circunstancias, tienes derechos bajo las leyes de protección de datos 
                en relación con tus datos personales, incluyendo el derecho a:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground">
                <li>Solicitar acceso a tus datos personales</li>
                <li>Solicitar corrección de tus datos personales</li>
                <li>Solicitar eliminación de tus datos personales</li>
                <li>Oponerte al procesamiento de tus datos personales</li>
                <li>Solicitar restricción del procesamiento de tus datos personales</li>
                <li>Solicitar transferencia de tus datos personales</li>
                <li>Retirar el consentimiento</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Comunicaciones por correo electrónico</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                <strong>Al registrarte y aceptar nuestros términos, das tu consentimiento explícito para recibir comunicaciones por correo electrónico.</strong> 
                Esto es especialmente importante porque queremos poder notificarte cuando tu idea propuesta haya sido desarrollada 
                y se haya convertido en un vídeo de AlpacaTech.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Las comunicaciones que puedes recibir incluyen:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-foreground">
                <li><strong>Notificaciones de desarrollo de ideas:</strong> Te avisaremos cuando tu idea propuesta 
                haya sido seleccionada y desarrollada en un vídeo del canal</li>
                <li>Actualizaciones sobre el estado de tus ideas enviadas</li>
                <li>Información sobre nuevos vídeos basados en ideas de la comunidad</li>
                <li>Notificaciones sobre nuevas funcionalidades del servicio</li>
                <li>Comunicaciones promocionales ocasionales relacionadas con el canal AlpacaTech</li>
              </ul>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                <strong>Importante:</strong> El consentimiento para recibir estas comunicaciones es necesario 
                para participar en el sistema de ideas, ya que es fundamental poder contactarte cuando 
                tu propuesta se materialice en contenido. Puedes darte de baja de las comunicaciones 
                promocionales en cualquier momento contactándonos, aunque recomendamos mantener activadas 
                las notificaciones sobre el desarrollo de tus ideas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Cookies y tecnologías similares</h2>
              <p className="text-muted-foreground leading-relaxed">
                Utilizamos cookies y tecnologías similares para mejorar tu experiencia, 
                mantener tu sesión iniciada y analizar el uso de nuestro servicio. Google Fonts 
                puede recopilar datos de uso y direcciones IP para proporcionar el servicio de fuentes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">10. Cambios en esta política</h2>
              <p className="text-muted-foreground leading-relaxed">
                Podemos actualizar esta Política de Privacidad ocasionalmente. Te notificaremos 
                sobre cambios importantes por correo electrónico o mediante un aviso en nuestro servicio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">11. Contactanos</h2>
              <p className="text-muted-foreground leading-relaxed">
                Si tienes preguntas sobre esta política de privacidad o nuestras prácticas de 
                privacidad, puedes contactarnos a través de nuestras redes sociales o mediante 
                el formulario de ideas especificando que es una consulta sobre privacidad.
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