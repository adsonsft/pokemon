import All from "../assets/types/icons/all.svg?react"
import Bug from "../assets/types/icons/bug.svg?react"
import Dark from "../assets/types/icons/dark.svg?react"
import Dragon from "../assets/types/icons/dragon.svg?react"
import Electric from "../assets/types/icons/electric.svg?react"
import Fairy from "../assets/types/icons/fairy.svg?react"
import Fighting from "../assets/types/icons/fighting.svg?react"
import Fire from "../assets/types/icons/fire.svg?react"
import Flying from "../assets/types/icons/flying.svg?react"
import Ghost from "../assets/types/icons/ghost.svg?react"
import Grass from "../assets/types/icons/grass.svg?react"
import Ground from "../assets/types/icons/ground.svg?react"
import Ice from "../assets/types/icons/ice.svg?react"
import Normal from "../assets/types/icons/normal.svg?react"
import Poison from "../assets/types/icons/poison.svg?react"
import Psychic from "../assets/types/icons/psychic.svg?react"
import Rock from "../assets/types/icons/rock.svg?react"
import Steel from "../assets/types/icons/steel.svg?react"
import Water from "../assets/types/icons/water.svg?react"

const icons = {
    All,
    Bug,
    Dark,
    Dragon,
    Electric,
    Fairy,
    Fighting,
    Fire,
    Flying,
    Ghost,
    Grass,
    Ground,
    Ice,
    Normal,
    Poison,
    Psychic,
    Rock,
    Steel,
    Water
}

function Icons({icon}) {
    const Selected = icons[icon] 
    return Selected ? <Selected /> : null
}

export default Icons