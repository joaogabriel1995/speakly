# 📝 Speakly - Backend e Microserviço de Transcrição de Vídeos

## 📌 Visão Geral

Speakly é um sistema composto por dois módulos principais: um **backend** responsável por gerenciar requisições, armazenar transcrições e coordenar o fluxo de dados; e um **microserviço de transcrição**, especializado no processamento de áudio e extração de texto a partir de vídeos. Essa arquitetura modular permite a escalabilidade e a reutilização do serviço de transcrição para diferentes aplicações. O sistema serve como base para dois grandes projetos:

## ⚙️ Tecnologias Utilizadas

### Backend (Node.js)

- **Linguagem:** TypeScript
- **Framework:** Express.js
- **Banco de Dados:** Prisma + PostgreSQL
- **Mensageria:** RabbitMQ
- **Cache e Fila:** Redis
- **WebSocket:** Para comunicação em tempo real
- **Validação de Dados:** Zod

### Microserviço de Transcrição (Python)

- **Linguagem:** Python 3.10
- **Transcrição:** OpenAI Whisper
- **Download de Vídeos:** yt-dlp
- **Mensageria:** RabbitMQ
- **Framework Web:** FastAPI

## 📂 Estrutura do Backend

```
├── package.json
├── prisma
│   ├── migrations
│   └── schema.prisma
├── src
│   ├── application
│   │   ├── controllers
│   │   ├── dtos
│   │   ├── interfaces
│   │   │   └── adapters
│   │   ├── schemas
│   │   └── useCases
│   ├── domain
│   │   ├── entities
│   │   ├── repository
│   │   └── services
│   ├── infrastructure
│   │   ├── adapters
│   │   ├── config
│   │   ├── messaging
│   │   ├── repository
│   │   ├── server
│   │   └── services
│   ├── index.ts
└── tsconfig.json
```

## 📂 Estrutura do Microserviço de Transcrição

```
.
├── README.MD
├── requirements.txt
├── src
│   ├── application
│   │   ├── dtos
│   │   │   ├── download_and_transcribe_dto.py
│   │   └── use_cases
│   │       ├── downloader.py
│   │       ├── fetch_and_transcribe.py
│   │       └── transcriber.py
│   ├── config
│   │   └── settings.py
│   ├── domain
│   │   ├── download.py
│   │   └── transcription.py
│   ├── infrastructure
│   │   ├── interfaces
│   │   │   ├── downloader.py
│   │   │   ├── message_broker.py
│   │   │   └── transcriber.py
│   │   ├── rabbitmq.py
│   │   ├── whisper.py
│   │   └── youtube_downloader.py
│   ├── main.py
```

## 🔄 Fluxo de Funcionamento

1. **Usuário** envia uma URL de vídeo via API do backend.
2. **O backend adiciona a URL na fila do RabbitMQ**.
3. **O microserviço de transcrição baixa o vídeo usando \*\*\*\*\*\*\*\*****`yt-dlp`**.
4. **O áudio é processado e transcrito pelo Whisper**.
5. **O resultado é publicado na fila de resposta do RabbitMQ**.
6. **O backend processa os dados e retorna a transcrição ao usuário**.

## 🚀 Como Executar o Backend

### 1. Clonar o Repositório

```bash
git clone https://github.com/joaogabriel1995/speakly.git
cd speakly-backend
```

### 2. Instalar Dependências

```bash
yarn install
```

### 3. Configurar o Banco de Dados

Crie um arquivo **.env** e adicione as credenciais do banco PostgreSQL:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/speakly
```

Rodar as migrações Prisma:

```bash
yarn prisma migrate dev
```

### 4. Executar o Backend

```bash
yarn dev
```

## 🚀 Como Executar o Microserviço de Transcrição

### 1. Clonar o Repositório

```bash
git clone https://github.com/joaogabriel1995/echoText.git
cd speakly-transcriber
```

### 2. Criar um ambiente virtual e instalar dependências

```bash
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Configurar as variáveis de ambiente

Crie um arquivo **.env** e adicione as configurações:

```env
RABBITMQ_URL=amqp://user:password@localhost:5672/
```

### 4. Executar o Serviço

```bash
python src/main.py
```

## 🛠 Endpoints Disponíveis

### 🎤 Transcrição de Vídeos

```http
POST /api/transcribe
```

**Body:**

```json
{
  "videoUrl": "https://www.youtube.com/watch?v=example"
}
```

**Resposta:**

```json
{
  "transcription": "Texto transcrito do vídeo..."
}
```

