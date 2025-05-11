// unique([1,2,2]) → [1,2]
// Retorna um novo array com valores únicos (sem repetições)
// Utiliza o tipo genérico para permitir que qualquer tipo de array possa ser aceito. No JS não é preciso declarar desta forma, pois a tipagem é dinâmica, porém, no TypeScript é necessário, pois é uma linguagem tipada.
export const unique = <TipoGenerico>(arr: TipoGenerico[]): TipoGenerico[] => [...new Set(arr)];

// groupBy([{tipo:'A'},{tipo:'B'}],'tipo') → {A:[…], B:[…]}
// Agrupa objetos de um array com base no valor de uma chave fornecida
// Novamente o uso do tipo genérico se faz necessário, porém o objeto deve ter uma chave do tipo String e qualque valor associado. Retornando um objeto que contém o parâmetro a ser agrupado (por meio do keyof) e o array de dados.
export const groupBy = <TipoGenerico extends Record<string, any>>(arr: TipoGenerico[], key: keyof TipoGenerico): Record<string, TipoGenerico[]> =>
  // O método reduce é utilizado para percorrer o array 'arr' e acumular os objetos em grupos, com base na chave fornecida (key).
  arr.reduce((acc: Record<string, TipoGenerico[]>, obj: TipoGenerico) => {
      // 'groupKey' recebe o valor da propriedade especificada pela chave 'key' do objeto 'obj'.
      // O valor é convertido para string, garantindo que a chave seja sempre uma string para agrupamento.
      const groupKey = String(obj[key]); 

      // Se o grupo identificado por 'groupKey' não existir ainda no acumulador 'acc', cria-se um array vazio.
      // Caso contrário, usa-se o array existente.
      // Em seguida, o objeto 'obj' é adicionado (push) ao array correspondente a 'groupKey'.
      (acc[groupKey] = acc[groupKey] || []).push(obj);

      // O acumulador 'acc' é retornado a cada iteração, mantendo os grupos atualizados.
      return acc;
    }, {}); // O valor inicial do acumulador é um objeto vazio, no qual os grupos serão armazenados.

  
// sumBy([{valor:10},{valor:5}], 'valor') → 15
// Soma os valores de uma determinada chave em todos os objetos do array 
// Assim como na função original, essa soma todos os valores de um array, seja numérico ou não
export const sumBy = <TipoGenerico>(arr: TipoGenerico[], key: keyof TipoGenerico): number | string => {
    // A primeira verificação obtém o valor do primeiro objeto no array (arr[0]) na chave especificada ('key').
    // Isso ajuda a definir se o valor inicial será numérico ou string, dependendo do tipo de dado encontrado.
    const first = arr[0]?.[key];
  
    // 'initial' define o valor inicial para o acumulador na função 'reduce'.
    // Se o valor da chave for um número, o valor inicial será 0.
    // Se for uma string (ou qualquer tipo diferente de número), o valor inicial será uma string vazia ('').
    const initial: any = typeof first === 'number' ? 0 : '';
  
    // A função 'reduce' é usada para iterar sobre todos os itens no array e calcular o valor total.
    return arr.reduce((total, obj) => {
      // Obtém o valor da chave específica no objeto atual (obj) do array.
      const value = obj[key];

      // Se o acumulador (total) for numérico e o valor também for numérico, faz a soma.
      if (typeof total === 'number' && typeof value === 'number') {
        return total + value;
      }

      // Se o acumulador for uma string, concatenamos o valor, convertendo-o para string, caso necessário.
      if (typeof total === 'string') {
        return total + String(value ?? '');
      }

      // Caso o tipo de total e value não seja numérico ou string, o acumulador é retornado sem alteração.
      return total;
    }, initial); // Passa o valor inicial (0 ou '') para o 'reduce'.
};

  
  
  