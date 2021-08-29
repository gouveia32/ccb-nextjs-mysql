import styles from "./Foods.module.css";
import FoodCard from "./../../components/Food/foodcard";
import { PrismaClient } from "@prisma/client";
import AddFood from "../../components/Food/addfood";
import { useState } from "react";

const prisma = new PrismaClient();

function Foods(props) {
  const [showAddFoodModal, setShowAddFoodModal] = useState(false);
  const foods = props.foods;

  return (
    <div className={styles.foodsCnt}>
      <div className={styles.foodsBreadcrumb}>
        <div>
          <h2>Recipes 🥗🥘🍱🍛</h2>
        </div>
        <div>
          <button
            className="btn"
            style={{
              paddingLeft: "15px",
              paddingRight: "15px",
              fontWeight: "500",
            }}
            onClick={() => setShowAddFoodModal((pV) => !pV)}
          >
            Add Food
          </button>
        </div>
      </div>
      <div className={styles.foods}>
        {foods?.map((food, i) => (
          <FoodCard food={food} key={i} />
        ))}
      </div>
      {showAddFoodModal ? (
        <AddFood closeModal={() => setShowAddFoodModal(false)} />
      ) : null}
    </div>
  );
}

export async function getServerSideProps() {
  const allFoods = await prisma.food.findMany();

  return {
    props: {
      foods: allFoods,
    },
  };
}
export default Foods;
