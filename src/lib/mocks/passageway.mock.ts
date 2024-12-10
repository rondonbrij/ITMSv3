import { Passageway } from "@/types/mocktypes";
import { mockCheckpoints } from "./checkpoint.mock";

export const mockPassageways: Passageway[] = [
  {
    id: 1,
    name: "Iwahig - Bucana",
    price: 30,
    checkpoints: [mockCheckpoints[0], mockCheckpoints[1]],  // Use Checkpoint objects
  },
  {
    id: 2,
    name: "Luz-V",
    price: 50,
    checkpoints: [mockCheckpoints[2]],
  },
  {
    id: 3,
    name: "Tagbarungis",
    price: 90,
    checkpoints: [mockCheckpoints[3]],
  },
  {
    id: 4,
    name: "Isaub - Inagawan",
    price: 100,
    checkpoints: [mockCheckpoints[4], mockCheckpoints[5]],
  },
  {
    id: 5,
    name: "Aborlan",
    price: 120,
    checkpoints: [mockCheckpoints[7]],
  },
  {
    id: 6,
    name: "Plaridel",
    price: 130,
    checkpoints: [mockCheckpoints[8]],
  },
  {
    id: 7,
    name: "Malatgao - Sandoval - Poblacion Narra",
    price: 150,
    checkpoints: [mockCheckpoints[9], mockCheckpoints[10], mockCheckpoints[11]],
  },
  {
    id: 8,
    name: "Malinao - Urduja",
    price: 170,
    checkpoints: [mockCheckpoints[12], mockCheckpoints[13]],
  },
  {
    id: 9,
    name: "Bato-Bato - Calategas - Tacras - Aramaywan",
    price: 180,
    checkpoints: [mockCheckpoints[14], mockCheckpoints[15], mockCheckpoints[16], mockCheckpoints[17]],
  },
  {
    id: 10,
    name: "Burirao - Palo-Palo - Abo-Abo",
    price: 200,
    checkpoints: [mockCheckpoints[18], mockCheckpoints[19], mockCheckpoints[20]],
  },
];
