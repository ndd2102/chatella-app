import { Footer } from "flowbite-react";
import Header from "../../components/Header/Header";

export default function Home() {
  return (
    <>
      <Header />
      <section className="dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 leading-loose text-4xl font-extrabold tracking-tight md:text-5xl xl:text-6xl dark:text-white">
              Great teamwork with{" "}
              <span className="text-blue-500"> great workspace!</span>
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Organized spaces for everyone and everything you need for work. In
              channels, it's easier to connect with your teammates whether
              you're working from home or from office.
            </p>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://cdn.dribbble.com/users/806947/screenshots/5955394/comp_2.gif"
              alt="mockup"
            />
          </div>
        </div>
      </section>
      <section className="dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://cdn.dribbble.com/users/538842/screenshots/5909882/main4.gif"
              alt="mockup"
            />
          </div>
          <div className="mr-auto pl-32 place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 leading-loose text-4xl font-extrabold tracking-tight md:text-5xl xl:text-6xl dark:text-white">
              More convenient with
              <span className="text-blue-500"> chat feature!</span>
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Members can communicate with each other right in the channel so
              everyone can have up-to-date information.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="max-w-screen-md mb-8 lg:mb-16">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Designed for business teams like yours
            </h2>
            <p className="text-gray-500 sm:text-xl dark:text-gray-400">
              Here at Chatella we focus on creating a convenient place for your
              teams.
            </p>
          </div>
        </div>
      </section>
      <Footer container={true}>
        <div className="w-full text-center">
          <Footer.Copyright by="Chatella" year={2022} />
        </div>
      </Footer>
    </>
  );
}
