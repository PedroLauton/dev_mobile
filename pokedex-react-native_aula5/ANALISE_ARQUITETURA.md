# Análise Crítica da Arquitetura Atuale - Pokedex

## 1. Estrutura de Diretórios
**Pergunta:** A organização atual dos arquivos em screens, components, services, etc., é clara para você? Você mudaria algum arquivo de lugar? Por quê?

**Resposta:**
Para mim, a estrutura atual do projeto é clara, evidenciando em cada pasta as responsabilidades e objetivos esperados de cada arquivo. Por exemplo, na camada services, espera-se um arquivo que implemente as regras de negócio e manipule os dados, como acontece no app.tsx. Ou, por exemplo, a pasta types, que contém os tipos dos dados a serem utilizados em toda a aplicação React Native. Portanto, para mim, a organização é clara quanto à disposição das pastas e arquivos. Ademais, eu realizaria mudanças no código, separando responsabilidades e aumentando a coesão da aplicação.

## 2. Componentização
**Pergunta:** O PokemonCard é um bom exemplo de componente reutilizável? Analise a tela PokemonDetailsScreen. Que partes dela você extrairia para um novo componente reutilizável para manter a tela mais limpa?

**Resposta:**
Sim, o componente PokemonCard é um bom exemplo de componente reutilizável. Ele concentra toda a lógica de renderização e apresentação de forma concisa do que se espera de um card, não sendo possível, na minha visão, extrair partes do componente para criar subcomponentes. Seguindo, ao observar a tela PokemonDetailsScreen, é notório que a atual apresentação das informações detalhadas do Pokémon poderia ser encapsulada em um componente reutilizável:

```tsx
return (
  <ScrollView contentContainerStyle={styles.container}>
    <Image source={{ uri: pokemon.image }} style={styles.image} />
    <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
    <Text style={styles.idText}>ID: #{pokemon.id}</Text>
    <View style={styles.typesContainer}>
      <Text style={styles.sectionTitle}>Tipos:</Text>
      {pokemon.types.map((type) => (
        <Text key={type} style={styles.typeText}>{capitalize(type)}</Text>
      ))}
    </View>
  </ScrollView>
);
```

Toda essa estrutura poderia ser extraída da screen e se tornar um componente à parte, permitindo melhor manutenção, aumentando a coesão do código e possibilitando a reutilização dessa estrutura em outros pontos do aplicativo.

## 3. Gerenciamento de Estado e Lógica
**Perguntas:**

- Onde a lógica de busca e filtragem de dados está localizada na PokedexScreen?

- Onde está a lógica para buscar os detalhes de um Pokémon específico na PokemonDetailsScreen?

- Você considera essa abordagem (lógica de estado e de dados dentro dos componentes de tela) sustentável para um aplicativo que continua crescendo? Quais são os prós e contras que você observa?

**Resposta:**
Ambas as telas utilizam o arquivo api.ts para realizar a requisição à API da Pokémon Company. Porém, o tratamento de exceções e manipulação de dados (filtrar, buscar) estão misturados com a lógica de apresentação do componente. Na minha visão, essa abordagem funciona, mas não apresenta o cenário ideal para uma aplicação que busca evoluir pensando em escalabilidade e manutenibilidade. Um ponto positivo é poder visualizar em um mesmo arquivo toda a lógica que leva à exibição dos dados, desde a requisição até o processo de salvamento e filtragem. Porém, essa abordagem mistura diferentes responsabilidades em um único arquivo, prejudicando a coesão do código e tornando difícil, por exemplo, a realização de testes, já que toda a lógica de busca, tratamento e exibição dos dados está unificada.

## 4. Pontos Fortes e Fracos
**Pergunta:** Baseado em sua análise, liste pelo menos dois pontos fortes (o que foi bem feito) e dois pontos fracos (o que poderia ser melhorado) na arquitetura atual da aplicação. Justifique cada ponto.

**Resposta:**
De acordo com o que analisei ao longo da aplicação, elenco a seguir dois pontos fortes e dois pontos fracos que merecem destaque no que diz respeito à arquitetura e organização do projeto.

Por mais que não tenha abordado esse tópico nas respostas anteriores, acho válido destacar como ponto forte a utilização do StyleSheet.create() para a separação da estilização, o que contribui para um código mais limpo, organizado e de fácil manutenção. Além disso, a estrutura de diretórios está bem definida, com pastas como screens, components, services e types, deixando evidente a responsabilidade de cada grupo de arquivos e facilitando tanto o desenvolvimento quanto futuras expansões do projeto.

Entre os pontos que considero fracos, o primeiro é a falta de separação clara de responsabilidades nas telas, que concentram lógica de dados, regras de negócio e apresentação em um mesmo arquivo. Isso reduz a coesão do código e dificulta testes unitários e manutenção. Um segundo ponto fraco é a baixa reutilização de componentes visuais em partes que compartilham estruturas semelhantes — como se observa na tela de detalhes do Pokémon, onde diversos elementos poderiam ser extraídos para componentes reutilizáveis, melhorando a legibilidade do código e permitindo consistência visual em diferentes partes da aplicação.