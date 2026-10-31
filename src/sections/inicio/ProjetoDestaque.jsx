function ProjetoDestaque() {
  return (
    <aside className="inicio-resumo" aria-labelledby="projeto-destaque">
      <p className="inicio-resumo-etiqueta">Projeto em destaque</p>

      <h2 id="projeto-destaque">Portfólio pessoal</h2>

      <p className="inicio-projeto-descricao">
        Aplicação em desenvolvimento com React, navegação lateral, layout
        responsivo e suporte a temas claro e escuro.
      </p>

      <ul className="inicio-projeto-tags">
        <li>React</li>
        <li>JavaScript</li>
        <li>CSS</li>
        <li>Vite</li>
      </ul>

      <a className="inicio-github" href="#projetos">
        Conhecer o projeto →
      </a>
    </aside>
  );
}

export default ProjetoDestaque;
