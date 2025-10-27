export interface Plant {
  id: number;
  name: string;
  imageUrl: string;
  environment: string;
  water: string;
  sunlight: string;
  soil: string;
  benefits: string;
}

export interface RoomConditions {
  sunlight: string;
  soil: string;
  fertilizer: string;
  importantReq: string;
  wateringFreq: number;
  space: string;
}

export interface SuggestedPlant {
  plantName: string;
  description: string;
  careInstructions: {
    watering: string;
    sunlight: string;
    fertilizer: string;
  };
  reasoning: string;
}

export interface Reminder {
  id: number;
  text: string;
  nextReminderDate: Date;
  frequencyDays: number;
}
