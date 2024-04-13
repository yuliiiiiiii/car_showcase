// Only the layout of <main> section is defined here
import Image from "next/image";
import { Hero, SearchBar, CustomFilter, CarCard} from "@/components";
import { fetchCars } from "@/utils";
import { CarProps } from "@/types";

export default async function Home() {
  const allCars: CarProps[] | [] | undefined= await fetchCars()
  //await the function to fetch cars data from API
  console.log(allCars)
  //Home is a server side component(default), so console.log can be seen in the Next.js server in the terminal, not in the front end console

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter title="fuel" />
            <CustomFilter title="year" />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
            {allCars?.map(car => (
              <CarCard car={car}/>
              )
            )}

            </div>
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        ) }
      </div>
    </main>
  );
}
