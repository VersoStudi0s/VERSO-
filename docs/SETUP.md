# Configuração e operação

## Contato

Copie `.env.example` para `.env` e preencha apenas informações profissionais autorizadas. Não versione esse arquivo.

| Variável pública | Uso |
| --- | --- |
| `VITE_SITE_URL` | Origem HTTPS definitiva, sem caminho; habilita canonical, OG absoluto e sitemap no build. |
| `VITE_CONTACT_ENDPOINT` | Endpoint compatível com o contrato abaixo; vazio mantém envio indisponível. |
| `VITE_CONTACT_EMAIL` | E-mail profissional público e canal de privacidade. |
| `VITE_WHATSAPP_NUMBER` | Número profissional, só dígitos, incluindo país e DDD. |
| `VITE_GITHUB_URL`, `VITE_LINKEDIN_URL`, `VITE_INSTAGRAM_URL` | URLs HTTPS dos perfis autorizados. |

O formulário envia `POST` JSON com `name`, `email`, `projectType`, `message`, `website` (honeypot vazio). Só aceita sucesso HTTP com `{ "sent": true }`. Dados são mantidos após falha. Não há persistência no navegador. A confirmação significa aceitação pelo serviço, não comprovação de entrega na caixa de entrada.

### Adaptador opcional

`netlify/functions/contact.ts` prepara uma função serverless em `/api/contact`, usando Resend por HTTPS. **Não está implantada e não possui credenciais.** Pode ser adaptada a outro provedor sem mudar o contrato do frontend.

Variáveis exclusivamente no servidor:

- `RESEND_API_KEY`: chave do provedor.
- `CONTACT_FROM_EMAIL`: remetente de um domínio verificado no provedor.
- `CONTACT_TO_EMAIL`: destinatário autorizado.
- `CONTACT_ALLOWED_ORIGIN`: origem exata autorizada, incluindo protocolo e sem barra final.

Para usar esse adaptador, configure `VITE_CONTACT_ENDPOINT=/api/contact`, as quatro variáveis no ambiente do servidor e os registros de verificação do domínio do remetente. Nunca use `VITE_` para segredos. Os testes não validam envio externo real: a verificação com um destinatário autorizado deve ocorrer depois da configuração.

Proteções implementadas: método e origem, conteúdo JSON, limites de corpo/campos, validação no servidor, honeypot, timeout, respostas sem detalhes do provedor e guarda limitada a cinco tentativas por minuto por IP fornecido pelo contexto confiável da plataforma. Essa guarda é por instância e não substitui rate limiting distribuído; configure a proteção do host antes de expor publicamente o endpoint. Não use cabeçalhos arbitrários do cliente como fonte confiável do IP.

Antes de ativar coleta: definir identidade da responsável, canal de direitos LGPD, operadores, finalidade/base legal, retenção, acessos à caixa de e-mail e transferências internacionais aplicáveis. Atualizar a política para refletir o provedor escolhido.

## Custos e serviços

A aplicação estática não exige assinatura de analytics, mapas, animações ou serviço 3D. Não foi contratado nenhum serviço. Domínio, hospedagem e provedor de e-mail podem ter custos e limites conforme o plano escolhido. Resend é apenas um adaptador opcional; confirmar tarifas, franquias, região e tratamento dos dados antes de adotar ou ativar. Não foi assumido nenhum preço mensal.

## Hospedagem, domínio e HTTPS

Não publicar sem autorização. `dist/` é a saída estática. A hospedagem deve servir os arquivos existentes antes do fallback da SPA. O build gera `dist/_redirects`, incluindo os estudos, privacidade e fallback. Isso evita servir o HTML inicial no lugar de um estudo e permite indexação do conteúdo sem JavaScript. O preview do Vite contém o mesmo mapeamento.

`netlify.toml` é uma configuração opcional, com diretório de build, função e cabeçalhos. Não cria conta, site ou deploy. Para outro host, adaptar as regras de rotas e os cabeçalhos. A política CSP padrão permite apenas recursos locais; se escolher um endpoint externo, adicionar explicitamente sua origem em `connect-src`.

Depois da autorização: vincular o domínio usando os registros DNS fornecidos pelo host, emitir o certificado TLS e ativar redirecionamento HTTP → HTTPS. Só ativar HSTS após verificar domínio e subdomínios. Preencher `VITE_SITE_URL` e reconstruir para gerar sitemap e metadados absolutos. Não há endereço comercial autorizado: nenhum mapa foi incluído.

## Adicionar um projeto

Adicionar um objeto tipado em `src/data/projects.ts`, com slug, categorias, status, imagens e conteúdo verificável. Galeria, filtros, rota, navegação para o próximo projeto, pré-renderização e regras de hospedagem derivam desses dados. Adicionar os arquivos WebP em `public/images/`, incluindo variantes 480 e 960. Manter os originais e atualizar os créditos. Nunca substituir conceitos por alegações de entrega sem evidência.
