// import Image from "next/image";

const linkData = [
  {
    title: 'Instagram',
    url: 'https://www.instagram.com/ybesomelyk/',
  },{
    title: 'Github',
    url: 'https://github.com/kylemoseby',
  },
  {
    title: 'Codepen',
    url: 'https://codepen.io/kylemoseby',
  },{
    title: 'LinkedIn',
    url: 'https://www.linkedin.com/in/kyle-moseby-b3b387259',
  },
];

const socialLinks = linkData.map((d, i) => {
  return (<li key={i}><a href={d.url}>{d.title}</a></li>);
});


export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--jersey-15-regular)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl ">Welcome to the personal website of Kyle Moseby</h1>
        <p>Currently located in the White Center neighborhood near Seattle, Washington.</p>
        <p>At this time I maintain the following socials:</p>
        <ul>
          {socialLinks}
        </ul>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
