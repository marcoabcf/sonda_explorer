# sonda_explorer

Este programa foi desenvolvido utilizando NodeJS e feito com base no cenário de um conjunto de sondas que foram enviadas pela NASA à Marte e que pousaram em um planalto.
Esse planalto, que curiosamente é retangular, deve ser explorado pelas sondas para que suas câmera embutidas consigam ter uma visão completa da área e enviar as imagens de volta para a Terra.

A posição e direção de uma sonda são representadas por uma combinação de coordenadas x-y e uma letra representando a direção cardinal para qual a sonda aponta, seguindo a rosa dos ventos em inglês.

![rosa dos ventos](http://i.imgur.com/li8Ae5L.png "Rosa dos Ventos")

O planalto é divido numa malha para simplificar a navegação. Um exemplo de posição seria (0, 0, N), que indica que a sonda está no canto inferior esquerdo e apontando para o Norte.

Para controlar as sondas, a NASA envia uma simples sequência de letras. As letras possíveis são "L", "R" e "M". Destas, "L" e "R" fazem a sonda virar 90 graus para a esquerda  ou direita, respectivamente, sem mover a sonda. "M" faz com que a sonda mova-se para a frente um ponto da malha, mantendo a mesma direção.

Nesta malha o ponto ao norte de (x,y) é sempre (x, y+1).

A ideia é criar um programa que processe uma série de instruções enviadas para as sondas que estão explorando este planalto.

## Instalação

O único requisito necessário é ter o NodeJS instalado. Caso não o tenha instalado, basta acessar https://github.com/nodejs/node ou https://nodejs.org/en/download/ e realizar a instalação.

### Execução

Após ter clonado o repositório e executado toda a instalação, abra o terminal no root da pasta onde o sonda_explorer foi salvo e execute o comando:

```console
$ node explorer.js
```

#### ENTRADA

A primeira informação de entrada é a quantidade de sondas que foram enviadas, que deve ser informada no formato de número (99).

```console
Informe a quantidade de sondas enviadas ao planalto> 2
```

Posteriormente deve ser informada a coordenada do ponto superior-direito da malha do planalto, informada no formato (X Y). Onde o primeiro define o X, seguido de espaço, e o segundo Y. Lembrando que a inferior esquerda sempre será (0,0).

```console
Informe a coordenada superior-direita da malha do planalto> 5 5
```

O resto da entrada será informação das sondas que foram implantadas. Cada sonda é representada por duas linhas. 

A primeira indica sua posição inicial(X Y) e sua direção cardinal(N):

```console
Informe as coordenadas da `(Número da Sonda)`ª Sonda> 1 2 N
```

E a segunda uma série de instruções indicando para a sonda como ela deverá explorar o planalto.

```console
Informe os movimentos da `(Número da Sonda)`ª Sonda> LMLMLMRMM
```

Cada sonda será controlada sequencialmente, o que quer dizer que a segunda sonda só irá se movimentar após que a primeira tenha terminado suas instruções.

#### SAÍDAS

A saída contém uma linha para cada sonda, na mesma ordem de entrada, indicando a coordenada final e direção de cada uma.

##### Exemplo de Saída correta:
```console
1 3 N
5 1 E
```

##### Validações:

* Formato Inválido.
* Coordenadas informadas para a sonda está fora do limite da malha do planalto (X, Y).

