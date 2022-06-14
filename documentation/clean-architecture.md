## Camadas(Pastas)

</br>
</br>
<div width="100%" align="center">
  <img
    src="https://miro.medium.com/max/1400/0*iU9Ks05_GTtGh6zV.jpg?w=100&h=50"
    alt="clean architecture"
    height="400"
  />
</div>
</br>
</br>


 - ``src/__mocks__`` :
   - Onde ficam os [mocks manuais][1], mocks da pasta `node_modules`
 - ``src/__tests__`` :
   - Onde ficam os testes e mocks
 - ``src/domain`` :
   - Criar as regras de negócios como uma ``interface``
 - ``src/Data`` :
   - Ter as implementações dos nossos casos de uso, ultilizando alguma implementação
   - colocamos no nome da classe qual o tipo de implementação dessa classe
 - `src/infra` :
   - Componentes que ultilizam bibliotecas de terceiros ou não
     - lá dentro que é que eu vou decidir se uso um fetch mesmo
 -  `src/presentation` :
    -  Converter os dados para mandar para a `UI`, que seria útil em outros projetos, mas com react, agora com os hooks, é mais prático manter a ui no `presentation`
- `src/validation` :
  - onde ficam os validadores de formulários
- `src/main` :
  - É aqui onde fica os patterns como `factories`
    - é aqui onde fica `classes` que `geram instâncias` de outras `classes`
  - quem vai implementar as outras camadas e vai se ligar a todas
    - designer patter chamado `composition roots`. Acoplar uma camada com todas as outras, para mantê-las desacopladas

[1]:https://jestjs.io/docs/manual-mocks
