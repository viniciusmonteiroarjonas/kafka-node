# Micro Serviço com Node.Js

- Utilizando o Kafka
- Utilizando o Node

## Aplicações

- API principal (Station)
- Geração de certificado

## Fluxo

- API principal envia uma mensagem para o serviço de certificado para gerar certificado.
- Micro-serviço de certificado devolve uma resposta (síncrona/assíncrona).
