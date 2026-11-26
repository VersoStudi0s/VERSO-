# Cloudflare Pages: passo a passo para o Claude in Chrome

Antes de começar, tenha em mãos:
- o número de WhatsApp comercial, só dígitos, com país e DDD (ex.: `55119XXXXXXXX`);
- o domínio próprio, se já foi comprado (opcional).

Abra o Chrome no computador, entre na sua conta da Cloudflare e cole o prompt abaixo no Claude in Chrome. Troque os dois campos entre colchetes.

---

```text
Quero configurar o projeto do site da VERSO* no Cloudflare Pages. Trabalhe só no painel da Cloudflare (dash.cloudflare.com), já estou logada. Não crie, apague nem compre nada. Antes de clicar em qualquer botão que salve, faça deploy ou mude DNS, me mostre o que vai mudar e espere eu dizer "pode".

Dados:
- Número do WhatsApp: [SÓ DÍGITOS, ex. 5511999999999]
- Domínio próprio: [DOMÍNIO ou "nenhum ainda"]

Passo 1. Encontrar o projeto
Vá em Workers & Pages e abra o projeto do site publicado em verso-e5t.pages.dev. Me diga o nome do projeto, se ele está ligado ao GitHub (repositório VersoStudi0s/VERSO-) e qual é a branch de produção.

Passo 2. Conferir a build
Em Settings > Build (ou Builds & deployments), confira e me mostre os valores atuais:
- Build command: npm run build
- Build output directory: dist
- Root directory: vazio (raiz do repositório)
Se estiver diferente, proponha a correção e espere meu "pode".

Passo 3. Variáveis de ambiente
Em Settings > Variables and Secrets (ambientes Production e Preview), adicione como variáveis de texto comum (não secretas):
- NODE_VERSION = 22
- VITE_SITE_URL = https://verso-e5t.pages.dev (se eu informei um domínio próprio, use https://[domínio])
- VITE_WHATSAPP_NUMBER = o número que informei
Não adicione nenhuma outra variável. Me mostre a lista final antes de salvar.

Passo 4. Ver a prévia, sem publicar em produção
Em Deployments, procure um deploy de prévia da branch claude/eager-wozniak-pl3tcz. Se existir, abra o link dele. Se não existir, só me avise: não faça deploy manual nem troque a branch de produção.
Na prévia, confira e me relate:
a) a página abre com o título "Seu negócio merece ser visto.";
b) o botão "Pedir protótipo grátis" leva para wa.me com o número certo;
c) /projetos/versary abre;
d) um endereço inexistente, como /teste-404, mostra a página "Essa página não existe";
e) nos cabeçalhos da resposta da página inicial (DevTools > Network > documento) aparecem strict-transport-security, content-security-policy e x-frame-options.

Passo 5. Só se eu informei um domínio próprio
a) Em Custom domains do projeto, adicione o domínio e me mostre os registros DNS que a Cloudflare pedir. Não altere DNS sem meu "pode".
b) Depois que o domínio estiver ativo, na zona do domínio vá em SSL/TLS > Edge Certificates e ative "Always Use HTTPS".
c) Em Rules > Redirect Rules, proponha um redirecionamento 301 de verso-e5t.pages.dev para o domínio próprio. Só crie depois do meu "pode".

Ao final, me entregue um resumo: o que estava configurado, o que mudou e o que ficou pendente.
```

---

## Depois do Claude in Chrome

- **Publicar em produção:** o código novo está na branch `claude/eager-wozniak-pl3tcz`. Produção só muda quando ela for mesclada na branch de produção (normalmente a `main`), o que pode ser feito por pull request. Faça isso só depois de aprovar a prévia.
- **Domínio próprio:** depois de ativá-lo, atualize o link da bio do Instagram.
- **Variável errada:** basta corrigir e refazer o deploy. Nenhuma dessas variáveis é secreta, todas aparecem no código do site.
