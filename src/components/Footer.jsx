import Icon from "./Icon";

const Footer = () => (
  <div className="fixed bottom-0 py-3 w-full h-10 flex space-x-2 items-center justify-center text-neutral-200 bg-neutral-900 border-t border-neutral-700 shadow-xl">
    <a href="https://twitter.com/aykutkardas" target="_blank" rel="noreferrer">
      <Icon icon="twitter" size={16} />
    </a>
    <a
      href="https://www.buymeacoffee.com/aykutkardas"
      target="_blank"
      rel="noreferrer"
    >
      <Icon icon="coffee" size={16} />
    </a>
    <a
      href="https://github.com/sponsors/aykutkardas"
      target="_blank"
      rel="noreferrer"
    >
      <Icon icon="heart" size={17} />
    </a>
  </div>
);

export default Footer;
