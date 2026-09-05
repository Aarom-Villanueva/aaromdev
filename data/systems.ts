export type SystemCaseData = {
  title: string;
  category: string;
  description: string;
  technologies: string[];
};

export const systemCases: SystemCaseData[] = [
  {
    title: 'Sistemas empresariales',
    category: 'Reglas y operaciones',
    description: 'Diseño de flujos, validaciones y persistencia para sistemas orientados a procesos de negocio.',
    technologies: ['Java', 'Spring Boot', 'SQL Server', 'Flyway'],
  },
  {
    title: 'Backend y APIs',
    category: 'Servicios y lógica',
    description: 'Servicios con autenticación, reglas de negocio y contratos que conectan interfaces con datos.',
    technologies: ['REST APIs', 'Spring Security', 'JWT', 'C#'],
  },
  {
    title: 'Datos y arquitectura',
    category: 'Estructura para crecer',
    description: 'Modelado relacional y separación de responsabilidades para sostener aplicaciones con lógica real.',
    technologies: ['PostgreSQL', 'MySQL', 'SQL Server', 'Entity Framework'],
  },
  {
    title: 'Cloud y aplicaciones',
    category: 'Ejecución y experiencia',
    description: 'Entornos, infraestructura y experiencias móviles que llevan una solución desde su estructura hasta su uso.',
    technologies: ['AWS', 'Docker', 'Kotlin', 'Jetpack Compose'],
  },
];
