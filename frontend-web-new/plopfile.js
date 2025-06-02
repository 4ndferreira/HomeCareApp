export default function (plop) {

  plop.setGenerator('component', {
      description: 'React component using Typescript and Atomic Design structure',
      prompts: [
        {
          type: 'list',
          name: 'layer',
          message: 'Which layer is this component?',
          choices: ['atoms', 'molecules', 'organisms', 'pages']
        },
        {
          type: 'input',
          name: 'name',
          message: 'Component name: '
        },
        {
          type: 'input',
          name: 'type',
          message: 'DOM API Type: ',
          default: 'HTMLDivElement'
        },
        {
          type: 'input',
          name: 'tag',
          message: 'Tag name: ',
          default: 'div'
        },
      ],
      actions: [
        {
          type: 'addMany',
          destination: 'src/components/{{layer}}/{{name}}',
          templateFiles: 'plop_templates/component/*.hbs',
          base: 'plop_templates/component',
        },
      ]
  });
};