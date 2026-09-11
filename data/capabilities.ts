export type Capability = {
  title: string;
  description: string;
  technologies: string[];
};

export const capabilities: Capability[] = [
  { title: 'Backend & Arquitectura', description: 'Servicios, APIs, autenticación y reglas de negocio estructurados alrededor de un problema concreto.', technologies: ['Java', 'Spring', '.NET', 'PostgreSQL'] },
  { title: 'Frontend & UX', description: 'Interfaces dinámicas, pulidas y responsive construidas con el ecosistema de Next.js.', technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'] },
  { title: 'Base de Datos & Cloud', description: 'Persistencia modelada para crecer y despliegue preparado para operar en producción.', technologies: ['SQL Server', 'Docker', 'JPA/Hibernate'] },
];