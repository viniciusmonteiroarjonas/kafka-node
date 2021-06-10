# Micro Serviço com Node.Js

## Tecnologias

- Kafka
- Node
- Docker

## Aplicações

- API principal (Station)
- Geração de certificado

## Fluxo

- API principal envia uma mensagem para o serviço de certificado para gerar certificado.
- Micro-serviço de certificado devolve uma resposta, falando que o certificado foi gerado com sucesso.

# Como rodar a aplicação

## Requisitos necessários

- Ter o node na última versão instalada.
- Ter o Docker instalado em sua máquina.

**Subir o containers do docker**

```
docker-composer up -d
```

**Acessar o diretório da /api por uma janela do terminal e rodar os comandos abaixo:**

**Instalar as dependências do projeto**

```
npm install
```

**Rodar a aplicação**

```
npm run dev
```

**Acessar o diretório da /certification por uma janela do terminal e rodar os comandos abaixo:**

**Instalar as dependências do projeto**

```
npm install
```

**Rodar a aplicação**

```
npm run dev
```

**Importar a collection do postman e fazer a requisição**
