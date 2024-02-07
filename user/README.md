# Writing competition web platform

This is the repo for the web platform for the writing competition. It is built using [Astro](https://astro.build/). Currently, there is only a first landing page, but more will be added in the future.

## Development
### Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

### Gitmoji

This project uses [gitmoji](https://gitmoji.dev/) for commit messages. Please use it when committing to this repo.

You can install it with `npm install -g gitmoji-cli` and then create a hook with `gitmoji -i` in the root of the project. This will create a hook that will run every time you commit. It will prompt you to select a gitmoji and then write a commit message.