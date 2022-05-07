## Problema do Jest com ES
- [documentação sobre a mudança para suportar ES nos testes](https://ionicframework.com/docs/intro/upgrading-to-ionic-6#testing)

- ### Minha solução:
  - Segui a documentação do Ionic, citada [acima](https://ionicframework.com/docs/intro/upgrading-to-ionic-6#testing). Nela indica para setar o **jest.config.js** com o ``transformIgnorePatterns``, ou, se o projeto for criado com react-app, colocar direto no package.json. Que foi o que eu fiz. Seguindo as regras [Running Tests](https://create-react-app.dev/docs/running-tests/) do React.
  - Meus passos foram:
    - mudar a pastas ``tests`` para ``__tests__``, nomenclatura usada
    - coloquei dentro da configuração do jest no ```package.json``` o seguinte:
    ```json
    {
      //...
      "testMatch": [
        "**/?(*.)+(spec).{ts,tsx}"
      ],
    }
    ```
      sobrescrevendo a configuração do [create-react-app](https://github.com/facebook/create-react-app/blob/main/packages/react-scripts/scripts/utils/createJestConfig.js)
    - acredito que ainda dê para sobrescrever mais alguma configurações...

## Problema de compatibilidade do **@ionic/react-router v5** com o **react-router v6**
- [Discução em aberto, requisição de atualização](https://github.com/ionic-team/ionic-framework/issues/24177)
