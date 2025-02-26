Estrutura de pastas:

📂 src
├── 📂 assets              # Recursos estáticos (imagens, fontes, etc.)
│   ├── 📂 images
│   ├── 📂 fonts
│   └── 📂 styles          # Estilos globais (CSS/Sass/Tailwind)
├── 📂 components          # Componentes reutilizáveis (UI atômica/molecular)
│   ├── 📂 common          # Componentes genéricos (Button, Input, Card, etc.)
│   ├── 📂 layout          # Componentes de layout (Header, Footer, Sidebar)
│   └── 📂 ui              # Componentes de interface específicos
├── 📂 features            # Funcionalidades específicas do domínio (Módulos)
│   ├── 📂 auth            # Exemplo: Módulo de autenticação
│   │   ├── 📂 components  # Componentes locais do módulo
│   │   ├── 📂 hooks       # Hooks personalizados
│   │   ├── 📂 services    # Chamadas à API ou lógica de serviço
│   │   └── 📄 index.ts    # Exportação consolidada
│   └── 📂 dashboard       # Exemplo: Módulo de dashboard
│       ├── 📂 components
│       ├── 📂 hooks
│       ├── 📂 services
│       └── 📄 index.ts
├── 📂 hooks               # Hooks reutilizáveis gerais
├── 📂 pages               # Páginas da aplicação (composição de componentes)
│   ├── 📄 Home.tsx
│   ├── 📄 Login.tsx
│   └── 📄 Dashboard.tsx
├── 📂 services            # Lógica de integração com APIs ou serviços externos
│   ├── 📄 api.ts          # Configuração do cliente HTTP (ex.: Axios)
│   └── 📄 authService.ts  # Exemplo de serviço
├── 📂 utils               # Funções utilitárias reutilizáveis
│   ├── 📄 formatters.ts
│   └── 📄 validators.ts
├── 📂 types               # Definições de tipos TypeScript
│   ├── 📄 user.ts
│   └── 📄 api.ts
├── 📄 App.tsx             # Componente raiz
├── 📄 index.tsx           # Ponto de entrada
└── 📄 routes.tsx          # Configuração de rotas (ex.: React Router)
