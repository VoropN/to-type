interface ILoadScript {
  url: string;
  onLoad: () => void;
}
export const loadScript = ({ url, onLoad }: ILoadScript) => {
  const script = document.createElement('script');
  script.src = url;
  script.async = true;
  script.onload = onLoad;
  document.body.appendChild(script);
};
