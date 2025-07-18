"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"
import { traitsData } from "../rulesdata/traits"

export interface CharacterState {
  selectedAncestryIds: string
  selectedClassId: string
  selectedTraitIds: string
  attributePointsSpent: number
  ancestryPointsSpent: number
  attributes: {
    might: number
    agility: number
    charisma: number
    intelligence: number
    wisdom: number
  }
}

type CharacterAction =
  | { type: "SET_SELECTED_ANCESTRY_IDS"; payload: string }
  | { type: "SET_SELECTED_CLASS_ID"; payload: string }
  | { type: "SET_SELECTED_TRAIT_IDS"; payload: string }
  | { type: "SET_ATTRIBUTE_POINTS_SPENT"; payload: number }
  | { type: "SET_ANCESTRY_POINTS_SPENT"; payload: number }
  | { type: "SET_ATTRIBUTES"; payload: CharacterState["attributes"] }
  | { type: "RESET_CHARACTER" }

const initialState: CharacterState = {
  selectedAncestryIds: "[]",
  selectedClassId: "",
  selectedTraitIds: "[]",
  attributePointsSpent: 0,
  ancestryPointsSpent: 0,
  attributes: {
    might: 0,
    agility: 0,
    charisma: 0,
    intelligence: 0,
    wisdom: 0,
  },
}

function characterReducer(state: CharacterState, action: CharacterAction): CharacterState {
  switch (action.type) {
    case "SET_SELECTED_ANCESTRY_IDS":
      return { ...state, selectedAncestryIds: action.payload }
    case "SET_SELECTED_CLASS_ID":
      return { ...state, selectedClassId: action.payload }
    case "SET_SELECTED_TRAIT_IDS":
      return { ...state, selectedTraitIds: action.payload }
    case "SET_ATTRIBUTE_POINTS_SPENT":
      return { ...state, attributePointsSpent: action.payload }
    case "SET_ANCESTRY_POINTS_SPENT":
      return { ...state, ancestryPointsSpent: action.payload }
    case "SET_ATTRIBUTES":
      return { ...state, attributes: action.payload }
    case "RESET_CHARACTER":
      return initialState
    default:
      return state
  }
}

interface CharacterContextType {
  state: CharacterState
  dispatch: React.Dispatch<CharacterAction>
  attributePointsRemaining: number
  ancestryPointsRemaining: number
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined)

export function CharacterProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(characterReducer, initialState)

  // Calculate attribute points remaining (base 27 points)
  const attributePointsRemaining =
    27 -
    (state.attributes.might +
      state.attributes.agility +
      state.attributes.charisma +
      state.attributes.intelligence +
      state.attributes.wisdom)

  // Calculate ancestry points remaining (base 5 points)
  const selectedTraitIds = JSON.parse(state.selectedTraitIds || "[]") as string[]
  const traitCosts = selectedTraitIds.reduce((total, traitId) => {
    const trait = traitsData.find((t) => t.id === traitId)
    return total + (trait?.cost || 0)
  }, 0)
  const ancestryPointsRemaining = 5 - traitCosts

  return (
    <CharacterContext.Provider
      value={{
        state,
        dispatch,
        attributePointsRemaining,
        ancestryPointsRemaining,
      }}
    >
      {children}
    </CharacterContext.Provider>
  )
}

export function useCharacter() {
  const context = useContext(CharacterContext)
  if (context === undefined) {
    throw new Error("useCharacter must be used within a CharacterProvider")
  }
  return context
}
