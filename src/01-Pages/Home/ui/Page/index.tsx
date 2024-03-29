import type { FC, ReactElement } from "react";

import { Todo } from "02-Widgets/Todo";

import "./_style.scss";

const Home: FC = (): ReactElement => {
  return (
    <main className="main">
      <section className="main__section-todos">
        <Todo />
      </section>
    </main>
  );
};

export default Home;
