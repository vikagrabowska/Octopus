# Octopus: Font/Typeface Design Testing Tool

Octopus is font or typeface design testing tool for static and variable fonts, that runs locally in your web browser.
Initially created by Viktoriya Grabowska and Szymon Marciniak, it became a public libre software project in 2024 thanks to financial support from Google Fonts.
Special thanks to Eben Sorkin and Dave Crossland for making this happen.

Octopus was made to test fonts with large design spaces more efficiently.
It offer up to six different views of a variable font, all at the same time.
It also allows you choose your views on or in-between masters.

Octopus is useful as a QA tool, as looking in-between masters can catch inconsistencies in your letterforms or spacing, especially interpolation problems.

Octopus is also useful for comparing your design to other designs, your roman to your italic, and so on.

Octopus can use premade texts to test into.
A growing body of sample texts are available from [github.com/SorkinType/octo-text](https://github.com/SorkinType/octo-text)

## Install

1. Download this repo, then make project specific copies as their own folders (or git branches), and then open the [index.html](index.html) file in your preferred browser.
(On macOS, you can even make the copies in your `/Applications` folder, if you want.)

2. Then, make copies of the fonts you want to test in the [/fonts](fonts) folder of the tool.
**Octopus does not see installed fonts on your computer.**

3. Then make test texts available in the [/assets](assets) folder.

## FAQ

#### Q: The tool ran into an issue, or hasn't seen a change in the font file

Refresh your browser page, or even quit the browser and restart it.

#### Q: Does Octopus run on and flavor or variety or Linux or Windows? If not we should note that.

It will work on both, as long as used with Chrome, Firefox, Opera or Safari. 
