import { useTranslation } from 'react-i18next';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import {
	Aside,
	AsideTitle,
	CompanionLink,
	ContentGrid,
	DocumentBody,
	DocumentSection,
	Eyebrow,
	Hero,
	HeroLayout,
	HeroMeta,
	Lead,
	Page,
	ReviewNotice,
	SectionCopy,
	SectionNav,
	SectionNumber,
	Shell,
	Title,
	Version
} from './LegalPages.styles';

// These drafts are deliberately not represented as published legal advice.
// Replace the unresolved items and review both languages before enabling analytics.
export const LEGAL_NOTICE_VERSION = '2026-09-21-draft';

type Section = { heading: string; paragraphs: string[] };
type Document = { title: string; intro: string; sections: Section[] };

const notices: Record<'en' | 'es', { privacy: Document; terms: Document }> = {
	en: {
		privacy: {
			title: 'Privacy notice',
			intro:
				'How DC20Clean handles local characters, cloud accounts, feedback, and optional analytics.',
			sections: [
				{
					heading: 'Who is responsible and how to reach us',
					paragraphs: [
						'[REVIEW REQUIRED: legal name and location of the operator; public privacy contact email.] You need these details to request access to, correction of, or deletion of your account data.'
					]
				},
				{
					heading: 'Information we use and why',
					paragraphs: [
						'You can create and keep characters in your browser without signing in. This data stays in browser storage unless you choose to export or move it to a cloud account. Clearing your browser data may delete local characters.',
						'If you sign in with Google, authentication and cloud saving involve an account identifier and profile details supplied by Google, plus the characters, custom monsters, encounters, and campaigns you choose to save. Campaign participation can make the characters and activity you share visible to other campaign members. We use this information to run the features you request, authenticate you, and protect the service.',
						'If you choose to open feedback, the Userback widget loads and may receive your current page URL and technical browser data. If you submit feedback, it also receives what you choose to send, which may include text, a screenshot or recording. Review screenshots before sending them; they can include your character information.',
						'[REVIEW REQUIRED: confirm whether Sentry error reporting is configured in production. If enabled, disclose the error and device information sent to Sentry, its purpose, location, and retention.]',
						'If you opt into analytics, PostHog Cloud EU receives an anonymous browser identifier, limited page and feature events, referring domain, safe campaign source values, and technical device metadata. Once you sign in, analytics events are linked to your internal account ID and account creation date. We do not send character names, notes, emails, or full page queries to PostHog. Analytics helps us understand usage and improve the app; it is not required to use DC20Clean. We do not use it for advertising or sell analytics data.'
					]
				},
				{
					heading: 'Storage and service providers',
					paragraphs: [
						'Essential browser storage supports local characters and sign-in. A choice cookie remembers whether you allow analytics for up to 182 days. Only after you opt in does PostHog use local storage for an analytics identity. You can change the choice using Privacy settings at the bottom of the app.',
						'Google handles sign-in, Convex stores cloud accounts and game data, Vercel hosts the web app, and Userback handles submitted feedback. PostHog Cloud EU handles analytics only when enabled and permitted. [REVIEW REQUIRED: confirm all enabled providers, processing agreements, processing locations, and any international transfers before publication.]'
					]
				},
				{
					heading: 'Retention, rights, and children',
					paragraphs: [
						'[REVIEW REQUIRED: specify retention and deletion procedures for accounts, cloud game data, feedback, and analytics; verify the intended age policy.] The target for identifiable raw analytics is no more than 13 months, but this must be confirmed in PostHog before enabling collection.',
						'You can withdraw analytics permission at any time without losing access to the app. Withdrawal stops new analytics collection and clears local PostHog identity; it cannot erase events already sent. Contact the operator for requests about access, correction, or deletion of information held by the service. Applicable rights and complaint options depend on where you live.'
					]
				}
			]
		},
		terms: {
			title: 'Terms of Use',
			intro: 'Using DC20Clean, managing your content, and sharing it in campaigns.',
			sections: [
				{
					heading: 'Service and eligibility',
					paragraphs: [
						'DC20Clean is a character-building and game-management tool for the DC20 tabletop role-playing game. [REVIEW REQUIRED: operator legal name, governing law, effective date, and whether minors may use the service.] Use the service only if you are allowed to do so under the applicable rules.'
					]
				},
				{
					heading: 'Your account and game content',
					paragraphs: [
						'Keep your sign-in access secure. You are responsible for the characters, campaign material, and other content you submit. You retain any rights you have in that content and permit the service to store and display it to provide the features you choose, including sharing with campaign members when you choose to participate or share.',
						'Do not upload unlawful material, someone else’s private information without permission, or content you do not have the right to share. Do not interfere with the app or other users. We may restrict access to protect the service or respond to abuse. [REVIEW REQUIRED: specify moderation, account termination, and data-export/deletion practice.]'
					]
				},
				{
					heading: 'Game material and availability',
					paragraphs: [
						'DC20Clean is an independent fan-made tool. References to DC20 and its game material belong to their respective rights holders. [REVIEW REQUIRED: verify the publisher’s permitted-use terms and the precise attribution or disclaimer before publication.]',
						'The app may change as game rules and the service evolve. Browser-local characters may be lost if browser storage is cleared; export important work. Cloud features depend on third-party services. [REVIEW REQUIRED: decide on availability commitments, any limitations of liability, and the process for changing these terms with legal review.]'
					]
				},
				{
					heading: 'Privacy and contact',
					paragraphs: [
						'The Privacy notice describes how account and usage information is handled. [REVIEW REQUIRED: public contact address for questions about these terms.]'
					]
				}
			]
		}
	},
	es: {
		privacy: {
			title: 'Aviso de privacidad',
			intro:
				'Cómo trata DC20Clean los personajes locales, las cuentas en la nube, los comentarios y los análisis opcionales.',
			sections: [
				{
					heading: 'Responsable y contacto',
					paragraphs: [
						'[REVISIÓN NECESARIA: nombre legal y ubicación del responsable; correo público de privacidad.] Estos datos son necesarios para solicitar acceso, rectificación o eliminación de los datos de tu cuenta.'
					]
				},
				{
					heading: 'Qué datos usamos y para qué',
					paragraphs: [
						'Puedes crear personajes y guardarlos en tu navegador sin iniciar sesión. Estos datos permanecen en el almacenamiento del navegador, salvo que los exportes o los traslades a una cuenta en la nube. Si borras los datos del navegador, podrías perder los personajes locales.',
						'Si inicias sesión con Google, la autenticación y el guardado en la nube utilizan un identificador de cuenta y datos de perfil proporcionados por Google, además de los personajes, monstruos personalizados, encuentros y campañas que decidas guardar. Participar en una campaña puede mostrar a otros miembros los personajes y la actividad que compartas. Usamos estos datos para ofrecer las funciones solicitadas, autenticarte y proteger el servicio.',
						'Si decides abrir los comentarios, se carga Userback y podría recibir la URL actual y datos técnicos del navegador. Si envías comentarios, también recibe lo que decidas compartir, posiblemente texto, una captura de pantalla o grabación. Revisa las capturas antes de enviarlas: podrían mostrar información de tus personajes.',
						'[REVISIÓN NECESARIA: confirmar si Sentry está configurado en producción. Si lo está, describir los errores y datos técnicos enviados, su finalidad, ubicación y conservación.]',
						'Si aceptas los análisis, PostHog Cloud EU recibe un identificador anónimo del navegador, eventos limitados de páginas y funciones, el dominio de referencia, valores seguros de origen de campañas y datos técnicos del dispositivo. Tras iniciar sesión, los eventos se vinculan a tu identificador interno de cuenta y fecha de creación. No enviamos nombres de personajes, notas, correos electrónicos ni consultas completas de páginas a PostHog. Los análisis nos ayudan a mejorar la aplicación; no son necesarios para usarla. No los usamos para publicidad ni vendemos los datos analíticos.'
					]
				},
				{
					heading: 'Almacenamiento y proveedores',
					paragraphs: [
						'El almacenamiento esencial del navegador permite guardar personajes locales e iniciar sesión. Una cookie recuerda tu elección sobre análisis durante un máximo de 182 días. PostHog solo utiliza almacenamiento local para su identificador analítico si aceptas. Puedes cambiar la elección en Opciones de privacidad al pie de la aplicación.',
						'Google gestiona el inicio de sesión; Convex almacena cuentas y datos de juego en la nube; Vercel aloja la aplicación; y Userback procesa los comentarios enviados. PostHog Cloud EU procesa análisis solo si están activados y autorizados. [REVISIÓN NECESARIA: confirmar proveedores activos, acuerdos, ubicaciones y transferencias internacionales.]'
					]
				},
				{
					heading: 'Conservación, derechos y menores',
					paragraphs: [
						'[REVISIÓN NECESARIA: definir conservación y eliminación de cuentas, datos de juego en la nube, comentarios y análisis; confirmar la política de edad.] El objetivo para eventos analíticos identificables es un máximo de 13 meses, pendiente de confirmación en PostHog antes de activarlos.',
						'Puedes retirar tu permiso para análisis sin perder acceso a la aplicación. Esto detiene la recopilación futura y elimina el identificador local de PostHog, pero no borra los eventos ya enviados. Contacta con el responsable para solicitar acceso, corrección o eliminación de datos del servicio. Los derechos y vías de reclamación dependen de tu ubicación.'
					]
				}
			]
		},
		terms: {
			title: 'Condiciones de uso',
			intro: 'Uso de DC20Clean, gestión de tu contenido y participación en campañas.',
			sections: [
				{
					heading: 'Servicio y requisitos',
					paragraphs: [
						'DC20Clean es una herramienta para crear personajes y gestionar partidas del juego de rol de mesa DC20. [REVISIÓN NECESARIA: nombre legal del responsable, ley aplicable, fecha de vigencia y acceso de menores.] Utiliza el servicio solo si puedes hacerlo conforme a las normas aplicables.'
					]
				},
				{
					heading: 'Tu cuenta y contenido',
					paragraphs: [
						'Protege el acceso a tu cuenta. Eres responsable de los personajes, campañas y demás contenido que envíes. Conservas los derechos que tengas sobre ese contenido y permites al servicio almacenarlo y mostrarlo para prestar las funciones que elijas, incluida la opción de compartirlo con miembros de una campaña.',
						'No subas material ilícito, información privada de terceros sin permiso ni contenido que no tengas derecho a compartir. No interfieras con la aplicación ni con otros usuarios. Podemos limitar el acceso para proteger el servicio o responder a abusos. [REVISIÓN NECESARIA: definir moderación, cierre de cuentas y exportación/eliminación de datos.]'
					]
				},
				{
					heading: 'Material del juego y disponibilidad',
					paragraphs: [
						'DC20Clean es una herramienta independiente creada por aficionados. Las referencias a DC20 y su material pertenecen a sus respectivos titulares. [REVISIÓN NECESARIA: comprobar las condiciones de uso del editor y la atribución o aviso exacto antes de publicar.]',
						'La aplicación puede cambiar junto con las reglas del juego y el servicio. Los personajes guardados en el navegador pueden perderse si se borran sus datos; exporta los trabajos importantes. Las funciones en la nube dependen de terceros. [REVISIÓN NECESARIA: definir compromisos de disponibilidad, límites de responsabilidad y cambios en estas condiciones con asesoramiento legal.]'
					]
				},
				{
					heading: 'Privacidad y contacto',
					paragraphs: [
						'El Aviso de privacidad explica el tratamiento de datos de cuenta y uso. [REVISIÓN NECESARIA: correo público para consultas sobre estas condiciones.]'
					]
				}
			]
		}
	}
};

function LegalPage({ kind }: { kind: 'privacy' | 'terms' }) {
	const { i18n } = useTranslation();
	const language = i18n.resolvedLanguage === 'es' ? 'es' : 'en';
	const document = notices[language][kind];
	const companionKind = kind === 'privacy' ? 'terms' : 'privacy';
	const companionTitle = notices[language][companionKind].title;

	return (
		<Page aria-labelledby="legal-title">
			<Shell>
				<Hero>
					<Eyebrow>DC20Clean / {language === 'es' ? 'Información legal' : 'Legal'}</Eyebrow>
					<HeroLayout>
						<div>
							<Title id="legal-title">{document.title}</Title>
							<Lead>{document.intro}</Lead>
						</div>
						<HeroMeta>
							<CompanionLink to={`/${companionKind}`}>
								{companionTitle} <ArrowRight size={17} aria-hidden="true" />
							</CompanionLink>
							<Version>
								{language === 'es' ? 'Versión del borrador' : 'Draft version'}:{' '}
								{LEGAL_NOTICE_VERSION}
							</Version>
						</HeroMeta>
					</HeroLayout>
					<ReviewNotice role="status">
						<AlertTriangle size={20} aria-hidden="true" />
						<span>
							{language === 'es'
								? 'BORRADOR PARA REVISIÓN: faltan decisiones del responsable. No publicar ni activar los análisis hasta completar y aprobar este texto.'
								: 'DRAFT FOR REVIEW: operator decisions remain open. Do not publish or enable analytics until this text is completed and approved.'}
						</span>
					</ReviewNotice>
				</Hero>
				<ContentGrid>
					<DocumentBody>
						{document.sections.map((section, index) => (
							<DocumentSection key={section.heading} id={`${kind}-section-${index + 1}`}>
								<SectionNumber aria-hidden="true">
									{String(index + 1).padStart(2, '0')}
								</SectionNumber>
								<SectionCopy>
									<h2>{section.heading}</h2>
									{section.paragraphs.map((paragraph) => (
										<p key={paragraph}>{paragraph}</p>
									))}
								</SectionCopy>
							</DocumentSection>
						))}
					</DocumentBody>
					<Aside>
						<AsideTitle>{language === 'es' ? 'En esta página' : 'On this page'}</AsideTitle>
						<SectionNav aria-label={language === 'es' ? 'Secciones' : 'Sections'}>
							{document.sections.map((section, index) => (
								<a href={`#${kind}-section-${index + 1}`} key={section.heading}>
									{section.heading}
								</a>
							))}
						</SectionNav>
					</Aside>
				</ContentGrid>
			</Shell>
		</Page>
	);
}

export function PrivacyPage() {
	return <LegalPage kind="privacy" />;
}

export function TermsPage() {
	return <LegalPage kind="terms" />;
}
