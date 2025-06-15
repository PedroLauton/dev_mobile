# Proposta de Refatoração para MVP ou MVVM - Pokedex

Para isso, escolha um dos padrões de arquitetura a seguir para a Pokédex: MVP ou MVVM. Com base na sua escolha, crie um documento de texto ou markdown chamado PROPOSTA_REFATORACAO.md e descreva como você reestruturaria a tela PokedexScreen.

## Resposta

Para reestruturar a tela PokedexScreen, escolho o padrão MVVM. Este prevê uma camada Model, responsável pela lógica de negócio e busca/processamento dos dados; uma camada View, responsável exclusivamente pela lógica de renderização (animações, transições); e a ViewModel, responsável por intermediar a comunicação entre Model e View.

A separação da lógica da camada View fica explícita nesse padrão de arquitetura, pois a ViewModel apenas expõe os dados para a View observar, sem ter nenhuma referência da View em seu código. Assim, qualquer lógica de apresentação ou estado da UI (como isLoading, errorMessage) está presente na ViewModel, deixando a camada View apenas observar as alterações de estado e dados para alterar sua exibição.

Esse padrão é projetado para frameworks de Data Binding (vinculação de dados), que atualizam automaticamente a UI quando um estado ou dado é alterado na rotina da aplicação, encaixando-se perfeitamente em aplicações React Native, como o caso desta atividade. Portanto, graças à sua aplicabilidade e sinergia com frameworks de Data Binding, escolho esse padrão de arquitetura para dar continuidade à atividade.

Explicada a escolha, o próximo passo é definir a nova disposição das pastas e arquivos para a tela PokedexScreen. Abaixo, exemplifico o esquema de como deve ocorrer a organização dos arquivos:

```
PokedexApp/
├── Model/
│   └── PokedexModel.ts
├── ViewModel/
│   └── PokedexViewModel.ts
├── View/
│   ├── PokedexScreen.tsx
│   └── PokedexScreen.styles.ts
```

Essa estrutura evidencia as três camadas explicadas, separando corretamente a responsabilidade em cada arquivo para que, juntos, possam exibir a tela PokedexScreen. Demonstrada a disposição das pastas, é necessário explicar como será a divisão das responsabilidades nessa nova organização.

O arquivo PokedexScreen.tsx, que pertencente à camada View, conterá apenas a lógica de renderização dos componentes. Ele será responsável por exibir elementos visuais como o campo de busca, a lista de pokémons e os indicadores de carregamento. Para alterar a exibição dos dados, a View se conecta às propriedades e comandos expostos pelo ViewModel. Um exemplo é a exibição condicional do componente ActivityIndicator com base na variável isLoading, que vem do ViewModel.

Por outro lado, o arquivo PokedexViewModel.ts será o responsável por toda a lógica de estado e apresentação. Nele estarão os estados como pokemons, searchQuery, isLoading, isLoadingMore, errorMessage, e a função loadMorePokemons, além do filtro que retorna os pokémons com base no texto pesquisado. Todas essas informações e comportamentos serão expostos para que a View apenas os consuma e renderize conforme a necessidade, sem se preocupar com a lógica por trás.

Já o arquivo PokedexModel.ts tratará exclusivamente da obtenção e transformação dos dados, centralizando as funções getPokemons, getPokemonDetails e outras que envolvem requisições externas e tratamento puro de dados.

A separação dessas camadas garante maior legibilidade, testabilidade e escalabilidade da aplicação, facilitando inclusive a reutilização de código e a manutenção a longo prazo.

Com base nessa arquitetura, o fluxo de dados quando o usuário interage com a interface será o seguinte:

1. O usuário digita no campo TextInput da View.

2. O evento onChangeText dispara a função setSearchQuery, que está exposta pelo ViewModel.

3. O ViewModel, ao perceber a alteração do estado da busca, atualiza a lista filtrada de pokémons com base no valor digitado, utilizando internamente a função filter.

4. Como a View observa diretamente esse estado filtrado, ela automaticamente re-renderiza a lista exibida de pokémons com base nos resultados.

5. Caso o usuário role a lista até o final, o método onEndReached é chamado, que aciona a função loadMorePokemons no ViewModel.

6. O ViewModel então solicita mais pokémons via Model, atualiza os estados pokemons e isLoadingMore, e notifica a View, que automaticamente atualiza sua interface conforme necessário.

Essa arquitetura, portanto, além de separar bem as responsabilidades, fornece um fluxo de dados claro e reativo, tornando a tela mais fácil de manter e evoluir à medida que novas funcionalidades forem sendo adicionadas.