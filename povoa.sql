INSERT INTO `categoria` (`id`, `nome`, `descricao`) VALUES
(1, 'Livro', 'Livros e materiais didáticos no geral'),
(2, 'Ferramentas', 'Ferramentas de uso geral como martelo, chave de fenda, chave estrela.'),
(3, 'Equipamentos', 'Equipamentos como furadeira, aspirador de pó dentro outros');

INSERT INTO `user` (`id`, `nome`, `email`, `senha`) VALUES
(1, 'Feodor', 'fpheby0@163.com\"', 'admin'),
(2, 'Irwinn', 'ipridmore1@squarespace.com', 'admin'),
(3, 'Cedric', 'cormes2@yale.edu', 'admin'),
(4, 'Reina', 'rborth3@furl.net\"', 'admin'),
(5, 'Gwenny', 'gburnhill4@nature.com', 'admin'),
(6, 'Sindee', 'lavington5@howstuffworks.com', 'admin'),
(7, 'Ingamar', 'iewdale6@drupal.org', 'admin'),
(8, 'Waverly', 'wvassbender7@nba.com', 'admin'),
(9, 'Dunstan', 'dwakeling8@wsj.com', 'admin'),
(10, 'Forrester', 'fciccottio9@dot.gov', 'admin');

INSERT INTO `item` (`id`, `nome`, `descricao`, `preco`, `situacao`, `user_id`, `categoria_id`) VALUES
(1, 'Usando Linux', 'Livro usando linux 4° edição, Bill Ball', 0, 0, 1, 1),
(2, 'Modelagem de objetos através da UML ', 'Livro de modelagem UML, autor José Davi Furlan', 0, 0, 2, 1),
(3, 'Aspirador de Pó', 'Aspirador de pó 110V, para interiores e automóveis', 20, 0, 4, 3),
(4, 'Furadeira', 'Conjunto de furadeiras com brocas', 10, 0, 5, 3),
(5, 'Martelo', 'Martelo comum', 0, 0, 6, 2),
(6, 'Kit Ferramentas completo', 'Jogos de chaves, inclui chaves de fenda, chave estrela, e chaves de boca com diferentes tamanhos', 8, 0, 9, 2),
(7, 'Eletromagnetismo', 'Livro de eletromagnetismo do Halliday volume 3', 0, 0, 10, 1),
(8, 'Bicicleta', 'Bicicleta para trilhas no geral', 20, 0, 3, 3);
