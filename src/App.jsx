/* eslint-disable react/prop-types */
import {
  Button,
  Center,
  Flex,
  Grid,
  HStack,
  Icon,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tooltip,
  Link,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CgZoomIn, CgZoomOut } from "react-icons/cg";
import { LuSpace } from "react-icons/lu";
import { BsBackspaceReverse } from "react-icons/bs";
import { GrClear } from "react-icons/gr";
import { PiBookOpenTextDuotone } from "react-icons/pi";
import { IoMdRefresh } from "react-icons/io";
import { RxColumnSpacing, RxFontStyle, RxArrowLeft } from "react-icons/rx";
import { TbMouse, TbMouseOff } from "react-icons/tb";
import iOS from "is-ios";
import Div100vh from "react-div-100vh";

const HAFS_FONT = "hafs";
const AMIRI_FONT = "amiri";
const DEFAULT_SLIDER_SIZE_VALUE = 59;
const FONT_SIZE_SYMBOL_KEYBOARD = ["1.4em", "1.4em", "2.0em", "2.0em"];
const MOBILE_SLIDER_ZOOM = "zoom";
const MOBILE_SLIDER_SPACING = "spacing";

const lettersJawi = ["چ", "ڠ", "ڤ", "ۏ", "ڽ"];

const lettersAll = [
  "ا",
  "ب",
  "ت",
  "ث",
  "ج",
  "ح",
  "خ",
  "چ",
  "د",
  "ذ",
  "ر",
  "ز",
  "س",
  "ش",
  "ص",
  "ض",
  "ط",
  "ظ",
  "ع",
  "غ",
  "ڠ",
  "ف",
  "ڤ",
  "ق",
  "ك",
  "ل",
  "م",
  "ن",
  "و",
  "ۏ",
  "ه",
  "ء",
  "ي",
  "ڽ",
  "ة",
];

const letters = lettersAll.filter((char) => !lettersJawi.includes(char));

const baris = ["َ", "ِ", "ُ", "ً", "ٍ", "ٌ", "ْ", "ّ"];
const extraLetters = ["ى", "ئ", "أ", "إ", "ؤ", "آ", "ٱ", "ـٰ"];

const letterSpacingMap = {
  0: "tighter",
  20: "tight",
  40: "normal",
  60: "wide",
  80: "wider",
  100: "widest",
};

function percentageToEm(p) {
  if (p < 0 || p > 100) {
    return 15;
  }
  return 1 + (p / 100) * 24;
}

export default function App() {
  const [stageText, setStageText] = useState("");
  const [stageTextSize, setStageTextSize] = useState(
    percentageToEm(DEFAULT_SLIDER_SIZE_VALUE) + "em"
  );
  const [textSpacing, setTextSpacing] = useState("normal");
  const [selectedLetterIndex, setSelectedLetterIndex] = useState(null);
  const [spacingValue, setSpacingValue] = useState(40);
  const [isEnabledHover, setIsEnabledHover] = useState(true);
  const [currentFont, setCurrentFont] = useState(HAFS_FONT);
  const [mobileSliderMode, setMobileSliderMode] = useState(null);
  const [isJawiMode, setIsJawiMode] = useState(false);

  function appendLetter(letter) {
    setStageText(stageText + letter);
  }

  function pressBackspace() {
    if (stageText === "") {
      return;
    }
    setStageText(stageText.slice(0, -1));
  }

  function handleSelectLetter(index) {
    if (index === selectedLetterIndex) {
      setSelectedLetterIndex(null);
    } else {
      setSelectedLetterIndex(index);
    }
  }

  function insertBaris(char) {
    let part1 = stageText.slice(0, selectedLetterIndex + 1);
    let part2 = stageText.slice(selectedLetterIndex + 1);

    let newText = part1 + char + part2;
    setStageText(newText);
  }

  function clearBaris() {
    let indexToBeRemoved = [];

    for (let n = selectedLetterIndex + 1; n < stageText.length; n++) {
      let char = stageText[n];
      if (baris.includes(char)) {
        indexToBeRemoved.push(n);
      } else {
        break;
      }
    }

    let splitted = stageText.split("");
    let newTextArr = splitted.filter(
      (_, index) => !indexToBeRemoved.includes(index)
    );

    setStageText(newTextArr.join(""));
  }

  function clearStage() {
    setStageText("");
    setSelectedLetterIndex(null);
  }

  function toggleChangeFont() {
    if (currentFont === AMIRI_FONT) {
      setCurrentFont(HAFS_FONT);
    } else if (currentFont === HAFS_FONT) {
      setCurrentFont(AMIRI_FONT);
    }
  }

  function toggleJawiArab() {
    setIsJawiMode(!isJawiMode);
  }

  useEffect(() => {
    if (isJawiMode) {
      setCurrentFont(AMIRI_FONT);
    }
    setStageText("");
  }, [isJawiMode]);

  let letterList = isJawiMode ? lettersAll : letters;
  let mainText = null;

  if (stageText === "") {
    mainText = (
      <Icon as={PiBookOpenTextDuotone} boxSize="250px" opacity={0.2} />
    );
  } else if (iOS || !isEnabledHover) {
    mainText = (
      <MainTextWrapper
        fontSize={stageTextSize}
        letterSpacing={textSpacing}
        currentFont={currentFont}
      >
        {stageText}
      </MainTextWrapper>
    );
  } else {
    mainText = (
      <MainTextWrapper
        fontSize={stageTextSize}
        letterSpacing={textSpacing}
        currentFont={currentFont}
      >
        {stageText.split("").map((char, index) => {
          let fontSize = char === " " ? "0.4em" : "unset";

          return (
            <Text
              fontSize={fontSize}
              key={index}
              color={index === selectedLetterIndex ? "red.500" : "unset"}
              as="span"
              _hover={{ color: "red.500" }}
              cursor="pointer"
              onClick={(event) => {
                event.stopPropagation();
                handleSelectLetter(index);
              }}
            >
              {char}
            </Text>
          );
        })}
      </MainTextWrapper>
    );
  }

  return (
    <Div100vh onClick={() => setSelectedLetterIndex(null)}>
      <Flex
        height="100%"
        flex={1}
        flexDirection="column"
        margin={["unset", "unset", "unset", "0 auto"]}
        width={["unset", "unset", "unset", "1200px"]}
      >
        <Flex
          flex={1}
          textAlign="center"
          overflow="hidden"
          height="inherit"
          justifyContent="center"
          alignItems="center"
          position="relative"
        >
          {selectedLetterIndex !== null && (
            <KeyboardBaris
              onLetterClick={(char) => insertBaris(char)}
              onClear={clearBaris}
            />
          )}
          {mainText}
        </Flex>

        {/* ----- mobile topbar ----- */}
        {mobileSliderMode === null && (
          <HStack
            py="10px"
            px="20px"
            display={["flex", "flex", "none", "none"]}
            justifyContent="center"
          >
            <MobileTopButton onClick={toggleJawiArab}>
              {isJawiMode ? "Arab" : "Jawi"}
            </MobileTopButton>
            {!isJawiMode && (
              <MobileTopButton onClick={toggleChangeFont}>
                <Icon as={RxFontStyle} boxSize="5" />
              </MobileTopButton>
            )}
            <MobileTopButton
              onClick={() => setMobileSliderMode(MOBILE_SLIDER_ZOOM)}
            >
              <Icon as={CgZoomIn} boxSize="5" />
            </MobileTopButton>
            <MobileTopButton
              onClick={() => setMobileSliderMode(MOBILE_SLIDER_SPACING)}
            >
              <Icon as={RxColumnSpacing} boxSize="5" />
            </MobileTopButton>
            <MobileTopButton onClick={() => setIsEnabledHover(!isEnabledHover)}>
              <Icon as={isEnabledHover ? TbMouse : TbMouseOff} boxSize="5" />
            </MobileTopButton>
          </HStack>
        )}

        {mobileSliderMode === MOBILE_SLIDER_ZOOM && (
          <HStack
            py="10px"
            px="20px"
            display={["flex", "flex", "none", "none"]}
            justifyContent="center"
          >
            <MobileTopButton onClick={() => setMobileSliderMode(null)}>
              <Icon as={RxArrowLeft} boxSize="6" />
            </MobileTopButton>
            <SliderZoom
              onChange={(value) => {
                let emValue = percentageToEm(value) + "em";
                setStageTextSize(emValue);
              }}
            />
          </HStack>
        )}

        {mobileSliderMode === MOBILE_SLIDER_SPACING && (
          <HStack
            py="10px"
            px="20px"
            display={["flex", "flex", "none", "none"]}
            justifyContent="center"
          >
            <MobileTopButton onClick={() => setMobileSliderMode(null)}>
              <Icon as={RxArrowLeft} boxSize="6" />
            </MobileTopButton>
            <SliderSpacing
              value={spacingValue}
              onChange={(value) => {
                setSpacingValue(value);
                setTextSpacing(letterSpacingMap[value]);
              }}
              onClickReset={() => {
                setTextSpacing("normal");
                setSpacingValue(40);
              }}
            />
          </HStack>
        )}

        {/* ----- desktop topbar ----- */}
        <HStack py="10px" px="20px" display={["none", "none", "flex", "flex"]}>
          <Button size="lg" fontSize="1.5em" onClick={toggleJawiArab}>
            {isJawiMode ? "Arab" : "Jawi"}
          </Button>
          {!isJawiMode && (
            <Tooltip label={"Change font"}>
              <Button size="lg" fontSize="1.5em" onClick={toggleChangeFont}>
                <Icon as={RxFontStyle} />
              </Button>
            </Tooltip>
          )}
          <SliderZoom
            onChange={(value) => {
              let emValue = percentageToEm(value) + "em";
              setStageTextSize(emValue);
            }}
          />
          <Flex flex={1} />
          <SliderSpacing
            value={spacingValue}
            onChange={(value) => {
              setSpacingValue(value);
              setTextSpacing(letterSpacingMap[value]);
            }}
            onClickReset={() => {
              setTextSpacing("normal");
              setSpacingValue(40);
            }}
          />
          {isEnabledHover ? (
            <Tooltip label="Character hover: Enabled">
              <Button
                size="lg"
                fontSize="1.5em"
                onClick={() => setIsEnabledHover(false)}
              >
                <Icon as={TbMouse} />
              </Button>
            </Tooltip>
          ) : (
            <Tooltip label="Character hover: Disabled">
              <Button
                size="lg"
                fontSize="1.5em"
                onClick={() => setIsEnabledHover(true)}
              >
                <Icon as={TbMouseOff} />
              </Button>
            </Tooltip>
          )}
        </HStack>

        <Flex p="20px" flexDirection="column">
          <Grid
            gridTemplateColumns={[
              isJawiMode ? "repeat(12, 1fr)" : "repeat(10, 1fr)",
              isJawiMode ? "repeat(12, 1fr)" : "repeat(10, 1fr)",
              isJawiMode ? "repeat(18, 1fr)" : "repeat(15, 1fr)",
              isJawiMode ? "repeat(18, 1fr)" : "repeat(15, 1fr)",
            ]}
            columnGap="5px"
            rowGap="5px"
            dir="rtl"
          >
            {letterList.map((letter) => (
              <KeyboardButton
                key={letter}
                letter={letter}
                onClick={() => appendLetter(letter)}
              />
            ))}
          </Grid>
          <Grid
            gridTemplateColumns="1fr 1fr 3fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
            columnGap="5px"
            rowGap="5px"
            height={["unset", "unset", "50px", "70px"]}
            mt="5px"
          >
            <KeyboardButton
              letter={GrClear}
              onClick={clearStage}
              isIcon
              fontSize={FONT_SIZE_SYMBOL_KEYBOARD}
            />
            <KeyboardButton
              letter={BsBackspaceReverse}
              onClick={pressBackspace}
              isIcon
              fontSize={FONT_SIZE_SYMBOL_KEYBOARD}
            />
            <KeyboardButton
              letter={LuSpace}
              onClick={() => appendLetter(" ")}
              isIcon
              fontSize={FONT_SIZE_SYMBOL_KEYBOARD}
              disableAnimation
            />
            {extraLetters.map((letter) => (
              <KeyboardButton
                key={letter}
                letter={letter}
                onClick={() => appendLetter(letter)}
              />
            ))}
          </Grid>
          <Text
            fontSize="0.8em"
            pt="10px"
            color="gray.400"
            textAlign="right"
            userSelect="none"
          >
            Dicipta oleh mansarip (
            <Link target="_blank" href="https://github.com/mansarip/pisahkata">
              Github
            </Link>
            )
          </Text>
        </Flex>
      </Flex>
    </Div100vh>
  );
}

function MainTextWrapper({
  children,
  fontSize = "15em",
  letterSpacing = "normal",
  currentFont,
}) {
  return (
    <Text
      fontSize={fontSize}
      fontFamily={currentFont}
      direction="rtl"
      userSelect="none"
      key={new Date().getTime()}
      whiteSpace="nowrap"
      textAlign="center"
      letterSpacing={letterSpacing}
    >
      {children}
    </Text>
  );
}

function KeyboardButton({
  letter,
  onClick,
  isIcon = false,
  fontSize = ["1.4em", "2em", "2em", "2.5em"],
  disableAnimation = false,
  w,
  h,
  fontFamily = AMIRI_FONT,
  fontWeight = "normal",
}) {
  return (
    <Center
      w={w}
      h={h}
      as={motion.button}
      key={letter}
      bg="gray.100"
      borderRadius={["5px", "5px", "10px", "10px"]}
      py={["2px", 0, 0, 0]}
      cursor="pointer"
      whileHover={{ scale: disableAnimation ? 1 : 1.15 }}
      whileTap={{ scale: disableAnimation ? 1 : 0.95 }}
      border="1px solid"
      borderBottom="3px solid"
      borderColor="gray.300"
      userSelect="none"
      _hover={{
        bg: "gray.500",
        color: "white",
        borderColor: "gray.800",
        boxShadow: "2xl",
      }}
      onClick={onClick}
      // fontSize={["1.4em", "2em", "2em", fontSize]}
      fontSize={fontSize}
      fontWeight={fontWeight}
    >
      {isIcon ? (
        <Icon as={letter} />
      ) : (
        <Text fontFamily={fontFamily}>{letter}</Text>
      )}
    </Center>
  );
}

function KeyboardBaris({ onLetterClick, onClear }) {
  const wh = ["50px", "50px", "60px", "60px"];

  return (
    <Grid
      p="10px"
      position="absolute"
      top={0}
      gridTemplateColumns={[
        "repeat(6, 1fr)",
        "repeat(6, 1fr)",
        "repeat(9, 1fr)",
        "repeat(9, 1fr)",
      ]}
      columnGap="5px"
      rowGap="5px"
      dir="rtl"
    >
      {baris.map((letter) => (
        <KeyboardButton
          fontFamily="hafs"
          fontSize={["3em"]}
          w={wh}
          h={wh}
          key={letter}
          letter={letter}
          onClick={(event) => {
            event.stopPropagation();
            onLetterClick(letter);
          }}
        />
      ))}
      <KeyboardButton
        letter={GrClear}
        onClick={(e) => {
          e.stopPropagation();
          onClear();
        }}
        isIcon
        fontSize="1.2em"
        w={wh}
        h={wh}
      />
    </Grid>
  );
}

function SliderZoom({ onChange }) {
  return (
    <HStack>
      <Icon as={CgZoomOut} boxSize="8" />
      <Slider
        defaultValue={DEFAULT_SLIDER_SIZE_VALUE}
        minW="200"
        onChange={(value) => onChange(value)}
      >
        <SliderTrack w="8px" borderRadius="base" bg="gray.200">
          <SliderFilledTrack bg="gray.300" />
        </SliderTrack>
        <SliderThumb
          userSelect="none"
          boxSize="7"
          bg="gray.100"
          border="2px solid"
        />
      </Slider>
      <Icon as={CgZoomIn} boxSize="8" />
    </HStack>
  );
}

function SliderSpacing({ value, onChange, onClickReset }) {
  return (
    <HStack spacing={5}>
      <Icon as={RxColumnSpacing} boxSize="8" />
      <Slider
        isReversed
        value={value}
        step={20}
        minW={[120, 120, 200, 200]}
        onChange={(val) => onChange(val)}
      >
        <SliderTrack w="8px" borderRadius="base" bg="gray.200">
          <SliderFilledTrack bg="gray.300" />
        </SliderTrack>
        <SliderThumb
          userSelect="none"
          boxSize="7"
          bg="gray.100"
          border="2px solid"
        />
      </Slider>
      <Tooltip label="Reset spacing">
        <Button size="lg" fontSize="1.5em" onClick={onClickReset}>
          <Icon as={IoMdRefresh} />
        </Button>
      </Tooltip>
    </HStack>
  );
}

function MobileTopButton({ children, onClick }) {
  return (
    <Button
      onClick={onClick}
      boxShadow="base"
      border="1px solid"
      borderColor="gray.300"
      size="sm"
    >
      {children}
    </Button>
  );
}
