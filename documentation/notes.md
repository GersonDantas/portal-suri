# Anti-Patterns/Code smells
- Speculative Generality
- God class
- Divergent Change
- Blank Lines
- Improper Instantiation
	-	evitar que classes criem instâncias dela mesma
- Hight Coupling
- Test code in Production
- Duplicate code
- Shotgun Surgery
- Long Params List
- Primitive Obsession
- Bad Naming

# Design Patterns/Principles/Conventions
- You Ain't Gonna need It (YAGNI)
- Single Responsibility (SRP)
- Liskov Substitution Principle (PSL)
- Dependency Injection (DI)
- Arrange, Act, Assert (AAA) or Triple A
  - organiza seu test: Arrage
  - Você tem uma ação que vai tomar: Act
  - E baseado na sua ação você vai testar alguma coisa: Assert
- Repository Pattern
	- alguém que faz uma ponte para alguém de fora
- Red, green refactor
- Test Doubles (Mocks, Stub, Spy)
- Small Commits
- System Under Test (SUT)
- Factory Patterns
- clean code

# TypeScript rules
- para injetar depedências nas classes
```typescript

	class CheckLastEventStatus {
		loadLastEventRepository: LoadLastEventRepository

		constructor (loadLastEventRepository: LoadLastEventRepository) {
			this.loadLastEventRepository = loadLastEventRepository
		}
		
		// ...
	}

```
- syntax sugar (Forma mais simples)
```typescript

	class CheckLastEventStatus {
		constructor ( private readonly loadLastEventRepository: LoadLastEventRepository) {}
		// private: só vou acessar aqui dentro
		// readonly: como se estivesse criando uma constante (não pode mudar)
		// ...
	}

```
