import Bug from "../assets/types/backgrounds/bug.svg?react"
import Dark from "../assets/types/backgrounds/dark.svg?react"
import Dragon from "../assets/types/backgrounds/dragon.svg?react"
import Electric from "../assets/types/backgrounds/electric.svg?react"
import Fairy from "../assets/types/backgrounds/fairy.svg?react"
import Fighting from "../assets/types/backgrounds/fighting.svg?react"
import Fire from "../assets/types/backgrounds/fire.svg?react"
import Flying from "../assets/types/backgrounds/flying.svg?react"
import Ghost from "../assets/types/backgrounds/ghost.svg?react"
import Grass from "../assets/types/backgrounds/grass.svg?react"
import Ground from "../assets/types/backgrounds/ground.svg?react"
import Ice from "../assets/types/backgrounds/ice.svg?react"
import Normal from "../assets/types/backgrounds/normal.svg?react"
import Poison from "../assets/types/backgrounds/poison.svg?react"
import Psychic from "../assets/types/backgrounds/psychic.svg?react"
import Rock from "../assets/types/backgrounds/rock.svg?react"
import Steel from "../assets/types/backgrounds/steel.svg?react"
import Water from "../assets/types/backgrounds/water.svg?react"

const backgrounds = {
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

function Backgrounds({bg}) {
    const Selected = backgrounds[bg] 
    return Selected ? <Selected /> : null
}

export default Backgrounds