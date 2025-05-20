import {Quiz} from '../models/quiz.model.js';
import { Sound } from '../models/sound.js';


export const seedQuizzes = async () => {
  const existing = await Quiz.find();
  if (existing.length > 0) return;

  await Quiz.insertMany([
    {
      title: 'Anxiety Assessment',
      questions: [
        {
          question: 'How often do you feel nervous, anxious, or on edge?',
          options: [
            { text: 'Never', score: 0 },
            { text: 'Sometimes', score: 1 },
            { text: 'Often', score: 2 },
            { text: 'Always', score: 3 }
          ]
        },
        {
          question: 'How often do you have trouble relaxing?',
          options: [
            { text: 'Never', score: 0 },
            { text: 'Sometimes', score: 1 },
            { text: 'Often', score: 2 },
            { text: 'Always', score: 3 }
          ]
        },
         {
          question: 'How often do you find yourself worrying too much about different things?',
          options: [
            { text: 'Never', score: 0 },
            { text: 'Sometimes', score: 1 },
            { text: 'Often', score: 2 },
            { text: 'Always', score: 3 }
          ]
        },
         {
          question:'How often do you become easily annoyed or irritable?',
          options: [
            { text: 'Never', score: 0 },
            { text: 'Sometimes', score: 1 },
            { text: 'Often', score: 2 },
            { text: 'Always', score: 3 }
          ]
        },
        {
          question:'How often do you feel so restless that its hard to sit still?',
          options: [
            { text: 'Never', score: 0 },
            { text: 'Sometimes', score: 1 },
            { text: 'Often', score: 2 },
            { text: 'Always', score: 3 }
          ]
        },
      ],
      resultCategories: [
        {
          minScore: 0,
          maxScore: 9,
          result: 'Mild Anxiety',
          recommendation: 'Practice mindfulness and breathing exercises.'
        },
        {
          minScore: 10,
          maxScore: 14,
          result: 'Moderate Anxiety',
          recommendation: 'Consider talking to a therapist.'
        },
        {
          minScore: 15,
          maxScore: 21,
          result: 'Severe Anxiety',
          recommendation: 'Seek professional mental health support.'
        }
      ]
    },
    {
      title: 'Depression Screening',
      questions: [
        {
          question: 'How often have you had little interest or pleasure in doing things?',
          options: [
            { text: 'Not at all', score: 0 },
            { text: 'Several days', score: 1 },
            { text: 'More than half the days', score: 2 },
            { text: 'Nearly every day', score: 3 }
          ]
        },
        {
          question: 'How often have you felt down, depressed, or hopeless?',
          options: [
            { text: 'Not at all', score: 0 },
            { text: 'Several days', score: 1 },
            { text: 'More than half the days', score: 2 },
            { text: 'Nearly every day', score: 3 }
          ]
        },
        {
          question: 'How often have you had trouble falling or staying asleep, or sleeping too much?',
          options: [
            { text: 'Not at all', score: 0 },
            { text: 'Several days', score: 1 },
            { text: 'More than half the days', score: 2 },
            { text: 'Nearly every day', score: 3 }
          ]
        },
        {
          question: 'How often have you felt tired or had little energy?',
          options: [
            { text: 'Not at all', score: 0 },
            { text: 'Several days', score: 1 },
            { text: 'More than half the days', score: 2 },
            { text: 'Nearly every day', score: 3 }
          ]
        },
        {
          question: 'How often have you had poor appetite or been overeating?',
          options: [
            { text: 'Not at all', score: 0 },
            { text: 'Several days', score: 1 },
            { text: 'More than half the days', score: 2 },
            { text: 'Nearly every day', score: 3 }
          ]
        },
        {
          question: 'How often have you felt bad about yourself or that you are a failure?',
          options: [
            { text: 'Not at all', score: 0 },
            { text: 'Several days', score: 1 },
            { text: 'More than half the days', score: 2 },
            { text: 'Nearly every day', score: 3 }
          ]
        },
        {
          question: 'How often have you had trouble concentrating on things?',
          options: [
            { text: 'Not at all', score: 0 },
            { text: 'Several days', score: 1 },
            { text: 'More than half the days', score: 2 },
            { text: 'Nearly every day', score: 3 }
          ]
        },
      ],
      resultCategories: [
        {
          minScore: 0,
          maxScore: 9,
          result: 'Mild Depression',
          recommendation: 'Stay active and connected with others.'
        },
        {
          minScore: 10,
          maxScore: 14,
          result: 'Moderate Depression',
          recommendation: 'Talk to a counselor or support group.'
        },
        {
          minScore: 15,
          maxScore: 21,
          result: 'Severe Depression',
          recommendation: 'Seek help from a mental health professional.'
        }
      ]
    },
    {
      title: 'Stress Level Test',
      questions: [
        {
          question: 'How often have you felt that you were unable to control the important things in your life?',
          options: [
            { text: 'Never', score: 0 },
            { text: 'Sometimes', score: 1 },
            { text: 'Often', score: 2 },
            { text: 'Always', score: 3 }
          ]
        },
        {
          question: 'How often have you felt confident about your ability to handle your personal problems?',
          options: [
            { text: 'Never', score: 0 },
            { text: 'Sometimes', score: 1 },
            { text: 'Often', score: 2 },
            { text: 'Always', score: 3 }
          ]
        },
        {
          question: 'How often have you felt that things were going your way?',
          options: [
            { text: 'Never', score: 0 },
            { text: 'Sometimes', score: 1 },
            { text: 'Often', score: 2 },
            { text: 'Always', score: 3 }
          ]
        },{
          question: 'How often have you felt difficulties were piling up so high that you could not overcome them?',
          options: [
            { text: 'Never', score: 0 },
            { text: 'Sometimes', score: 1 },
            { text: 'Often', score: 2 },
            { text: 'Always', score: 3 }
          ]
        },{
          question: 'How often have you been upset because of something that happened unexpectedly?',
          options: [
            { text: 'Never', score: 0 },
            { text: 'Sometimes', score: 1 },
            { text: 'Often', score: 2 },
            { text: 'Always', score: 3 }
          ]
        }
      ],
      resultCategories: [
        {
          minScore: 0,
          maxScore: 6,
          result: 'Low Stress',
          recommendation: 'Maintain a balanced lifestyle.'
        },
        {
          minScore: 7,
          maxScore: 13,
          result: 'Moderate Stress',
          recommendation: 'Try journaling or relaxation techniques.'
        },
        {
          minScore: 14,
          maxScore: 20,
          result: 'High Stress',
          recommendation: 'Consult a stress management coach or therapist.'
        }
      ]
    }
  ]);

  console.log('✅ Quizzes seeded successfully');
};


export const seedSounds = async () => {
  const existing = await Sound.find();
  if (existing.length > 0) return;

  await Sound.insertMany([
    {
      name: "Gentle Rain",
      description: "Soft rainfall on leaves and rooftops",
      duration: "Continuous",
    },
    {
      name: "Ocean Waves",
      description: "Waves gently crashing on the shore",
      duration: "Continuous",
    },
    {
      name: "Night Sounds",
      description: "Crickets and gentle night ambience",
      duration: "Continuous",
    },
    {
      name: "Forest Birds",
      description: "Birds chirping in a peaceful forest",
      duration: "Continuous",
    },
    {
      name: "Campfire",
      description: "Crackling fire sounds",
      duration: "Continuous",
    },
    {
      name: "Gentle Piano",
      description: "Soft piano melodies for relaxation",
      duration: "Continuous",
    }
  ]);

  console.log('✅ Sounds seeded successfully');
};