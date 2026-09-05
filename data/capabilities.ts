export type Capability = {
  title: string;
  description: string;
  technologies: string[];
};

export const capabilities: Capability[] = [
  { title: 'Diseñar productos digitales', description: 'Conectar experiencia de usuario, lógica de negocio y estructura técnica para dar forma a soluciones utilizables.', technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'] },
  { title: 'Construir sistemas backend', description: 'Estructurar servicios, APIs, autenticación, reglas de negocio y persistencia alrededor de un problema concreto.', technologies: ['Java', 'Spring Boot', 'REST APIs', 'JWT'] },
  { title: 'Modelar datos para aplicaciones', description: 'Pensar relaciones, consultas y persistencia como parte del comportamiento de un sistema que debe crecer.', technologies: ['PostgreSQL', 'MySQL', 'SQL Server'] },
  { title: 'Convertir procesos en software', description: 'Traducir operaciones y necesidades de negocio en flujos digitales claros, validables y mantenibles.', technologies: ['C#', '.NET', 'WCF', 'Entity Framework'] },
  { title: 'Diseñar experiencias responsive', description: 'Construir interfaces que conserven jerarquía, claridad y utilidad en distintos tamaños de pantalla.', technologies: ['React', 'HTML', 'CSS', 'Jetpack Compose'] },
  { title: 'Preparar soluciones para operar', description: 'Considerar entornos, despliegue e infraestructura como parte de la construcción de una solución.', technologies: ['AWS', 'Docker', 'Git', 'GitHub'] },
];
