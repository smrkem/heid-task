// modified from https://github.com/hadrienj/StaircaseJS/blob/master/Staircase.js

class DbStaircase {
    constructor(settings) {
        if (typeof settings.firstVal==="undefined") {
            throw new Error("No firstVal specified for staircase")
        }
        if (typeof settings.down==="undefined") {
            throw new Error("No down value specified for staircase")
        }
        if (!Array.isArray(settings.stepSizes)) {
            throw new Error("No array stepSizes specified for staircase.");
          }
        this.stairs = settings
        this.stairs.up = settings.up || 1
        this.stairs.maxValue = settings.maxValue || 10000
        this.stairs.currentDirection = 0
        this.stairs.values = [settings.firstVal]
        this.stairs.successiveGood = 0
        this.stairs.successiveBad = 0
        this.stairs.reversed = false
        this.stairs.numReversals = 0
        this.stairs.currentStepSizeIndex = 0
        this.stairs.verbosity = settings.verbosity || 0

        if (this.stairs.verbosity) {
            console.log(`Built ${this.stairs.up}-up, ${this.stairs.down}-down staircase.`)
        }
    }

    getValue() {
      const currentVal = this.stairs.values[this.stairs.values.length - 1];
      return Math.min(currentVal, this.stairs.maxValue);
    }

    addResponse(resp) {
        if (resp) {
            this.stairs.successiveBad = 0
            this.stairs.successiveGood++
        }
        else {
            this.stairs.successiveBad++
            this.stairs.successiveGood = 0
        }
        this.stairs.values.push(this.chooseNextVal(resp))
    }

    chooseNextVal(resp) {
        const ans = resp ? 'harder' : 'easier'
        this.stairs.reversed = false

        if (ans === 'easier' && this.stairs.successiveBad >= this.stairs.up) {
            this.successiveBad = 0

            // Detect reversal
            if (this.stairs.currentDirection === -1) {
                this.incrementStepSizeIndex()
                this.stairs.reversed = true
                this.stairs.numReversals++
            }
            this.stairs.currentDirection = 1
            const newVal = this.timings()
            if (this.stairs.verbosity > 0) {
                console.log("Decreasing stair difficulty. Setting new value to " + newVal + "ms.");
            }
            return Math.min(newVal, this.stairs.maxValue);
        }
        else if (ans === 'harder' && this.stairs.successiveGood >= this.stairs.down) {
            this.successiveGood = 0

            // Detect reversal
            if (this.stairs.currentDirection === 1) {
                this.incrementStepSizeIndex()
                this.stairs.reversed = true
                this.stairs.numReversals++
            }
            this.stairs.currentDirection = -1
            const newVal = this.timings()
            if (this.stairs.verbosity > 0) {
                console.log("Increasing stair difficulty. Setting new value to " + newVal + "ms.");
            }
            return Math.min(newVal, this.stairs.maxValue);
        }

        return this.stairs.values[this.stairs.values.length - 1]
    }

    timings() {
        const dB = this.stairs.stepSizes[this.stairs.currentStepSizeIndex]
        const oldVal = this.stairs.values[this.stairs.values.length - 1]
        const ratio = Math.pow(10, dB/20 * this.stairs.currentDirection)
        return oldVal * ratio
    }

    incrementStepSizeIndex() {
        if (this.stairs.currentStepSizeIndex === this.stairs.stepSizes.length - 1) { return }
        this.stairs.currentStepSizeIndex++
    }

}

export {
    DbStaircase
}