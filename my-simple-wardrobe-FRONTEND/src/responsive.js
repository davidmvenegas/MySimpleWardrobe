import { css } from "styled-components";

export const veryLarge = (i) => {
    return css`
        @media (max-width: 1350px) {
            ${i}
        }
    `
}
export const large = (i) => {
    return css`
        @media (max-width: 1225px) {
            ${i}
        }
    `
}
export const medium = (i) => {
    return css`
        @media (max-width: 1050px) {
            ${i}
        }
    `
}
export const small = (i) => {
    return css`
        @media (max-width: 850px) {
            ${i}
        }
    `
}
export const smaller = (i) => {
    return css`
        @media (max-width: 625px) {
            ${i}
        }
    `
}
export const mobile = (i) => {
    return css`
        @media only screen and (max-width: 480px) {
            ${i}
        }
    `
}
export const tiny = (i) => {
    return css`
        @media only screen and (max-width: 350px) {
            ${i}
        }
    `
}