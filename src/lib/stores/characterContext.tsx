"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"
import { traitsData } from "../rulesdata/traits"

// Types
interface CharacterState {
  selectedAncestryIds: string
  selectedTraitIds: string
  selectedClassId: string
  attributePointsSpent: number
  ancestryPointsSpent: number
  skillPointsSpent: number
  tradePointsSpent: number
  languagePointsSpent: number
  attributes: {
    might: number
    agility: number
    charisma: number
    intelligence: number
    wisdom: number
  }
}

type CharacterAction =
  | { type: "SET_ANCESTRY_IDS"; payload: string }
  | { type: "SET_TRAIT_IDS"; payload: string }
  | { type: "SET_CLASS_ID"; payload: string }
  | { type: "SET_ATTRIBUTE_POINTS_SPENT"; payload: number }
  | { type: "SET_ANCESTRY_POINTS_SPENT"; payload: number }
  | { type: "SET_SKILL_POINTS_SPENT"; payload: number }
  | { type: "SET_TRADE_POINTS_SPENT"; payload: number }
  | { type: "SET_LANGUAGE_POINTS_SPENT"; payload: number }
  | { type: "SET_ATTRIBUTES"; payload: CharacterState["attributes"] }

interface CharacterContextType {
  state: CharacterState
  dispatch: React.Dispatch<CharacterAction>
  ancestryPointsRemaining: number
  attributePointsRemaining: number
}

// Initial state
const initialState: CharacterState = {
  selectedAncestryIds: "[]",
  selectedTraitIds: "[]",
  selectedClassId: "",
  attributePointsSpent: 0,
  ancestryPointsSpent: 0,
  skillPointsSpent: 0,
  tradePointsSpent: 0,
  languagePointsSpent: 0,
  attributes: {
    might: 0,
    agility: 0,
    charisma: 0,
    intelligence: 0,
    wisdom: 0,
  },
}

// Reducer
function characterReducer(state: CharacterState, action: CharacterAction): CharacterState {
  switch (action.type) {
    case "SET_ANCESTRY_IDS":
      return { ...state, selectedAncestryIds: action.payload }
    case "SET_TRAIT_IDS":
      return { ...state, selectedTraitIds: action.payload }
    case "SET_CLASS_ID":
      return { ...state, selectedClassId: action.payload }
    case "SET_ATTRIBUTE_POINTS_SPENT":
      return { ...state, attributePointsSpent: action.payload }
    case "SET_ANCESTRY_POINTS_SPENT":
      return { ...state, ancestryPointsSpent: action.payload }
    case "SET_SKILL_POINTS_SPENT":
      return { ...state, skillPointsSpent: action.payload }
    case "SET_TRADE_POINTS_SPENT":
      return { ...state, tradePointsSpent: action.payload }
    case "SET_LANGUAGE_POINTS_SPENT":
      return { ...state, languagePointsSpent: action.payload }
    case "SET_ATTRIBUTES":
      return { ...state, attributes: action.payload }
    default:
      return state
  }
}

// Context
const CharacterContext = createContext<CharacterContextType | undefined>(undefined)

// Provider component
export function CharacterProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(characterReducer, initialState)

  // Calculate ancestry points remaining
  const ancestryPointsRemaining = (() => {
    const basePoints = 5
    try {
      const selectedTraitIds = JSON.parse(state.selectedTraitIds) as string[]
      const totalCost = selectedTraitIds.reduce((sum, traitId) => {
        const trait = traitsData.find((t) => t.id === traitId)
        return sum + (trait?.cost || 0)
      }, 0)
      return basePoints - totalCost
    } catch {
      return basePoints
    }
  })()

  // Calculate attribute points remaining
  const attributePointsRemaining = (() => {
    const basePoints = 27
    const totalSpent = Object.values(state.attributes).reduce((sum, value) => {
      if (value <= 13) return sum + value
      if (value === 14) return sum + 15
      if (value === 15) return sum + 17
      return sum + value
    }, 0)
    return basePoints - totalSpent
  })()

  const contextValue: CharacterContextType = {
    state,
    dispatch,
    ancestryPointsRemaining,
    attributePointsRemaining,
  }

  return <CharacterContext.Provider value={contextValue}>{children}</CharacterContext.Provider>
}

// Hook to use the context
export function useCharacter() {
  const context = useContext(CharacterContext)
  if (context === undefined) {
    throw new Error("useCharacter must be used within a CharacterProvider")
  }
  return context
}
