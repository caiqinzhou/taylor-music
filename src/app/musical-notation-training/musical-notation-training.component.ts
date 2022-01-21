import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RenderContext, Vex } from 'vexflow';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-musical-notation-training',
  templateUrl: './musical-notation-training.component.html',
  styleUrls: ['./musical-notation-training.component.less']
})
export class MusicalNotationTrainingComponent implements OnInit {

  @ViewChild('vexflowQuestion', { static: true })
  vexflowQuestion!: ElementRef;
  started = false;
  message = "Welcome to Taylor's musical training!";
  counter = 0;
  score = 0;
  voice = "";
  counter_interval = 3;
  VF = Vex.Flow;
  context: RenderContext | undefined;

  questionKeys = [
    {
      "clef": "treble",
      "key": "g/3",
      "voice": 5
    },
    {
      "clef": "treble",
      "key": "a/3",
      "voice": 6
    }, {
      "clef": "treble",
      "key": "b/3",
      "voice": 7
    }, {
      "clef": "treble",
      "key": "c/4",
      "voice": 1
    },
    {
      "clef": "treble",
      "key": "d/4",
      "voice": 2
    },
    {
      "clef": "treble",
      "key": "e/4",
      "voice": 3
    },
    {
      "clef": "treble",
      "key": "f/4",
      "voice": 4
    },
    {
      "clef": "treble",
      "key": "g/4",
      "voice": 5
    },
    {
      "clef": "treble",
      "key": "a/4",
      "voice": 6
    },
    {
      "clef": "treble",
      "key": "b/4",
      "voice": 7
    },
    {
      "clef": "treble",
      "key": "c/5",
      "voice": 1
    },
    {
      "clef": "treble",
      "key": "d/5",
      "voice": 2
    },
    {
      "clef": "treble",
      "key": "e/5",
      "voice": 3
    },
    {
      "clef": "treble",
      "key": "f/5",
      "voice": 4
    },
    {
      "clef": "treble",
      "key": "g/5",
      "voice": 5
    },
    {
      "clef": "treble",
      "key": "a/5",
      "voice": 6
    }
  ]

  questionIndex = 0;

  constructor(private _snackBar: MatSnackBar) {

  }

  showFlow(): void {
    this.vexflowQuestion.nativeElement.innerHTML = null;
    // Create an SVG renderer and attach it to the DIV element named "boo".
    var renderer = new this.VF.Renderer(this.vexflowQuestion?.nativeElement, this.VF.Renderer.Backends.SVG);
    // Size our SVG:
    renderer.resize(150, 150);
    // And get a drawing context:
    this.context = renderer.getContext();
    // Create a stave at position 10, 40 of width 400 on the canvas.
    var stave = new this.VF.Stave(25, 0, 100);
    // Add a clef and time signature.
    stave.setClef(this.questionKeys[this.questionIndex].clef);
    // .addTimeSignature("4/4");
    // Connect it to the rendering context and draw!
    stave.setContext(this.context).draw();

    var note =
      // A quarter-note C.
      new Vex.Flow.StaveNote({
        clef: this.questionKeys[this.questionIndex].clef,
        keys: [this.questionKeys[this.questionIndex].key],
        duration: "q"
      });

    // Create a voice in 4/4 and add the notes from above
    var voice = new Vex.Flow.Voice({ num_beats: 1, beat_value: 4 });
    voice.addTickable(note);

    // Format and justify the notes to 350 pixels (50 pixels left for key and time signatures).
    var formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 50);

    // Render voice
    voice.draw(this.context, stave);

  }

  getRandomNumInt(min: number, max: number) {
    var Range = max - min;
    var Rand = Math.random(); //获取[0-1）的随机数
    return (min + Math.round(Rand * Range)); //放大取整
    // return 0;
  }

  showQuestion(): void {
    if (!this.started) {
      return;
    }
    if (this.counter === 0) {
      this.questionIndex = this.getRandomNumInt(0, this.questionKeys.length - 1);
    }
    this.showFlow()
    this.counter = this.counter <= 0 ? this.counter_interval : (this.counter - 1);
    setTimeout(() => { this.showQuestion(); }, 1000);
  }

  startGame(): void {
    if (this.started) {
      return
    }
    this.counter = 0;
    this.started = true;
    this.message = "Game Started!"
    this.showQuestion();
  }

  stopGame(): void {
    if (!this.started) {
      return
    }
    this.started = false;
    this.message = "Game Stopped!"
  }

  resetGame(): void {
    this.message = "Welcome to Taylor's musical training!";
    this.started = false;
    this.counter = 0;
    this.score = 0;
  }

  answer(yourAnswer: number): void {
    if (!this.started) {
      return;
    }
    if (yourAnswer === this.questionKeys[this.questionIndex].voice) {
      this.message = "Good job! Taylor!";
      this._snackBar.open(this.message, "", { "duration": 1000, verticalPosition: "top" });
      this.score++;
    } else {
      this.message = "Oh no! It's " + this.questionKeys[this.questionIndex].voice;
      this._snackBar.open(this.message, "", { "duration": 1000, verticalPosition: "top" });
    }
  }

  ngOnInit(): void {

  }

}
