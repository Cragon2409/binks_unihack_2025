import { ThemeConfig, theme } from 'antd';
import { variants } from '@rose-pine/palette';

export const maxWidth = 1100;
export const maxWidthLogin = 600;

// Dark (main/default) theme colours
export const mainBase          = "#" + variants.main.colors.base.hex;
export const mainSurface       = "#" + variants.main.colors.surface.hex;
export const mainOverlay       = "#" + variants.main.colors.overlay.hex;
export const mainMuted         = "#" + variants.main.colors.muted.hex;
export const mainSubtle        = "#" + variants.main.colors.subtle.hex;
export const mainText          = "#" + variants.main.colors.text.hex;
export const mainLove          = "#" + variants.main.colors.love.hex;
export const mainGold          = "#" + variants.main.colors.gold.hex;
export const mainRose          = "#" + variants.main.colors.rose.hex;
export const mainPine          = "#" + variants.main.colors.pine.hex;
export const mainFoam          = "#" + variants.main.colors.foam.hex;
export const mainIris          = "#" + variants.main.colors.iris.hex;
export const mainHighlightLow  = "#" + variants.main.colors.highlightLow.hex;
export const mainHighlightMed  = "#" + variants.main.colors.highlightMed.hex;
export const mainHighlightHigh = "#" + variants.main.colors.highlightHigh.hex;

// Light (dawn) theme colours
export const dawnBase          = "#" + variants.dawn.colors.base.hex;
export const dawnSurface       = "#" + variants.dawn.colors.surface.hex;
export const dawnOverlay       = "#" + variants.dawn.colors.overlay.hex;
export const dawnMuted         = "#" + variants.dawn.colors.muted.hex;
export const dawnSubtle        = "#" + variants.dawn.colors.subtle.hex;
export const dawnText          = "#" + variants.dawn.colors.text.hex;
export const dawnLove          = "#" + variants.dawn.colors.love.hex;
export const dawnGold          = "#" + variants.dawn.colors.gold.hex;
export const dawnRose          = "#" + variants.dawn.colors.rose.hex;
export const dawnPine          = "#" + variants.dawn.colors.pine.hex;
export const dawnFoam          = "#" + variants.dawn.colors.foam.hex;
export const dawnIris          = "#" + variants.dawn.colors.iris.hex;
export const dawnHighlightLow  = "#" + variants.dawn.colors.highlightLow.hex;
export const dawnHighlightMed  = "#" + variants.dawn.colors.highlightMed.hex;
export const dawnHighlightHigh = "#" + variants.dawn.colors.highlightHigh.hex;

export const lightTheme: ThemeConfig = {
    algorithm: theme.defaultAlgorithm,
    token: {
      // Seed token
      borderRadius:   8,
      colorBgBase:    dawnBase,
      colorError:     dawnLove,
      colorInfo:      dawnIris,
      colorLink:      dawnIris,
      colorPrimary:   dawnIris,
      colorSuccess:   dawnFoam,
      colorTextBase:  dawnText,
      colorWarning:   dawnGold,
      fontFamily:     "Segoe UI",
      // Map token
      colorBgContainer:     dawnSurface,
      colorBgElevated:      dawnOverlay,
      colorBgLayout:        dawnBase,
      colorBgSpotlight:     dawnMuted,
      colorBorder:          dawnMuted,
      colorBorderSecondary: dawnMuted,
      colorFillQuaternary:  dawnOverlay,
      
    },
    components: {
      Layout: {
        headerBg: dawnBase,
        footerBg: dawnSurface
      },
      Table: {
        footerBg: dawnSurface
      }
    }
  }
  
export const darkTheme: ThemeConfig = {
    algorithm: theme.darkAlgorithm,
      token: {
        // Seed token
        borderRadius:   8,
        colorBgBase:    mainBase,
        colorError:     mainLove,
        colorInfo:      mainIris,
        colorLink:      mainIris,
        colorPrimary:   mainIris,
        colorSuccess:   mainFoam,
        colorTextBase:  mainText,
        colorWarning:   mainGold,
        fontFamily:     "Segoe UI",
        // Map token
        colorBgContainer:     mainSurface,
        colorBgElevated:      mainOverlay,
        colorBgLayout:        mainBase,
        colorBgSpotlight:     mainMuted,
        colorBorder:          mainMuted,
        colorBorderSecondary: mainMuted,
        colorFillQuaternary:  mainOverlay,
        
      },
      components: {
        Layout: {
          headerBg: mainBase,
          footerBg: mainSurface
        },
        Table: {
          footerBg: mainSurface
        }
      }
  }