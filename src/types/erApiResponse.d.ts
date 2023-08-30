interface DefaultErApiResponse {
  code: number;
  message: string;
}

export interface ErFreeCharacters extends DefaultErApiResponse {
  freeCharacters: number[];
}

export interface ErUserInfo extends DefaultErApiResponse {
  user: User;
}

export interface ErDetailGame extends DefaultErApiResponse {
  userGames: BattleUserResult[];
}

export interface ErGameList extends DefaultErApiResponse {
  userGames: BattleUserResult[];
  next: string;
}

interface BattleUserResult {
  userNum: number;
  nickname: string;
  gameId: number;

  /**
   * 2: 일반
   * 3: 랭크
   */
  matchingMode: matchingMode;

  /**
   * 1: 솔로
   * 2: 듀오
   * 3: 스쿼드
   */
  matchingTeamMode: number;
  seasonId: number;
  characterNum: number;
  skinCode: number;
  characterLevel: number;
  gameRank: number;
  playerKill: number;
  playerAssistant: number;
  monsterKill: number;
  bestWeapon: number;
  bestWeaponLevel: number;
  masteryLevel: { [key: string]: number };
  equipment: { [key: string]: number };
  versionMajor: number;
  versionMinor: number;
  language: string;
  skillLevelInfo: { [key: string]: number };
  skillOrderInfo: { [key: string]: number };
  serverName: string;
  maxHp: number;
  maxSp: number;
  attackPower: number;
  moveSpeed: number;
  defense: number;
  hpRegen: number;
  spRegen: number;
  attackSpeed: number;
  outofCombatMoveSpeed: number;
  sightRange: number;
  attackRange: number;
  critialStrikeChance: number;
  criticalStrikeDamage: number;
  coolDownReduction: number;
  lifeSteal: number;
  normalLifeSteal: number;
  skillLifeSteal: number;
  amplifierToMonster: number;
  trapDamage: number;
  gainExp: number;
  startDtm: string;
  duration: number;
  mmrBefore: number;
  mmrGain: number;
  mmrAfter: number;
  playTime: number;
  watchTime: number;
  totalTime: number;
  botAdded: number;
  botRemain: number;
  restrictedAreaAccelerated: number;
  safeAreas: number;
  teamNumber: number;
  preMade: number;
  eventMissionResult: { [key: string]: number };
  victory: number;
  craftUncommon: number;
  craftRare: number;
  craftEpic: number;
  craftLegend: number;
  damageToPlayer: number;
  damageToPlayer_trap: number;
  damageToPlayer_basic: number;
  damageToPlayer_skill: number;
  damageToPlayer_itemSkill: number;
  damageToPlayer_direct: number;
  damageFromPlayer: number;
  damageFromPlayer_trap: number;
  damageFromPlayer_basic: number;
  damageFromPlayer_skill: number;
  damageFromPlayer_itemSkill: number;
  damageFromPlayer_direct: number;
  damageToMonster: number;
  damageToMonster_trap: number;
  damageToMonster_basic: number;
  damageToMonster_skill: number;
  damageToMonster_itemSkill: number;
  damageToMonster_direct: number;
  damageFromMonster: number;
  killMonsters: { [key: string]: number };
  healAmount: number;
  teamRecover: number;
  protectAbsorb: number;
  addSurveillanceCamera: number;
  addTelephotoCamera: number;
  removeSurveillanceCamera: number;
  removeTelephotoCamera: number;
  useHyperLoop: number;
  useSecurityConsole: number;
  giveUp: number;
  teamSpectator: number;
  routeIdOfStart: number;
  routeSlotId: number;
  placeOfStart: number;
  mmrAvg: number;
  teamKill: number;
  accountLevel: number;
  killerUserNum: number;
  killer: string;
  killDetail: string;
  killerCharacter: string;
  killerWeapon: string;
  causeOfDeath: string;
  placeOfDeath: string;
  [key: `killerUserNum${number}`]: number;
  [key: `killer${number}`]: string;
  [key: `killDetail${number}`]: string;
  [key: `killerCharacter${number}`]: string;
  [key: `killerWeapon${number}`]: string;
  [key: `causeOfDeath${number}`]: string;
  [key: `placeOfDeath${number}`]: string;
  fishingCount: number;
  useEmoticonCount: number;
  traitFirstCore: number;
  traitFirstSub: number[];
  traitSecondSub: number[];
  totalTurbineTakeover?: number;
  startingItems?: number[];
  usedNormalHealPack?: number;
  UsedReinforcedHealPack?: number;
  UsedNormalShiedPack?: number;
  UsedReinforcedShieldPack?: number;
  TotalVFCredit: number[];
  CreditSource: { [key: string]: number };
  UsedVFCredit: number[];
  BoughtInfusion?: { [key: string]: number };
  ItemTransferredConsole?: number[];
  ItemTransferredDrone?: number[];
  FinalInfusion?: number[];
  CraftMythic?: number;
  playerDeaths: number;
  KillGamma: boolean;
  ScoredPoint?: number[];
  KillDetails: { [key: string]: number };
  DeathDetails: { [key: string]: number };
  KillsPhaseOne?: number;
  KillsPhaseTwo?: number;
  KillsPhaseThree?: number;
  DeathsPhaseOne?: number;
  DeathsPhaseTwo?: number;
  DeathsPhaseThree?: number;
  CCTimeToPlayer: number;
  foodCraftCount: { [key: string]: number };
  beverageCraftCount: { [key: string]: number };
  airSupplyOpenCount: { [key: string]: number };
  afk: boolean;

  /**
   * 1: 전투 외 이유로 탈출 실패
   * 2: 적 유저에게 사망
   * 3: 탈출 성공
   */
  escapeState: number;
  collectItemForLog: number[];
  collectFirstItemForLog: { [key: string]: number[] };
  totalDoubleKill: number;
  totalTripleKill: number;
  totalQuadraKill: number;
  totalExtraKill: number;
  battleZone1AreaCode: number;
  battleZone1BattleMark: number;
  battleZone1ItemCode: number[];
  battleZonePlayerKillCount: number;
  battleZonePlayerDeathCount: number;
  battleZone1Winner: number;
  battleZone1BattleMarkCount: number;
  tacticalSkillGroup: number;
  tacticalSkillLevel: number;
  totalGainVFCredit: number;
  killPlayerGainVFCredit: number;
  killChickenGainVFCredit: number;
  killBoarGainVFCredit: number;
  killWildDogGainVFCredit: number;
  killWolfGainVFCredit: number;
  killBearGainVFCredit: number;
  killOmegaGainVFCredit: number;
  killBatGainVFCredit: number;
  killWicklineGainVFCredit: number;
  killAlphaGainVFCredit: number;
  killItemBountyGainVFCredit: number;
  killDroneGainVFCredit: number;
  killGammaGainVFCredit?: number;
  killTurretGainVFCredit?: number;
  itemShredderGainVFCredit?: number;
  totalUseVFCredit: number;
  remoteDroneUseVFCreditMySelf: number;
  remoteDroneUseVFCreditAlly: number;
  transferConsoleFromMaterialUseVFCredit: number;
  transferConsoleFromEscapeKeyUseVFCredit: number;
  transferConsoleFromRevivalUseVFCredit: number;
  tacticalSkillUpgradeUseVFCredit: number;
  infusionReRollUseVFCredit?: number;
  infusionTraitUseVFCredit?: number;
  infusionRelicUseVFCredit?: number;
  infusionStoreUseVFCredit?: number;
  teamElimination: number;
  teamDown: number;
  teamBattleZoneDown: number;
  teamRepeatDown: number;
  adaptiveForce: number;
  adaptiveForceAttack: number;
  adaptiveForceAmplify: number;
  skillAmp: number;
  campFireCraftUncommon: number;
  campFireCraftRare: number;
  campFireCraftEpic: number;
  campFireCraftLegendary: number;
  cobaltRandomPickRemoveCharacter: number;
  tacticalSkillUseCount: number;
  creditRevivalCount: number;
  creditRevivedOthersCount: number;
  timeSpentInBriefingRoom: number;
  IsLeavingBeforeCreditRevivalTerminate: boolean;
  crGetAnimal: number;
  crGetMutant: number;
  crGetPhaseStart: number;
  crGetKill: number;
  crGetAssist: number;
  crGetTimeElapsed: number;
  crGetCreditBonus: number;
  crUseRemoteDrone: number;
  crUseUpgradeTacticalSkill: number;
  crUseTreeOfLife: number;
  crUseMythril: number;
  crUseForceCore: number;
  crUseVFBloodSample: number;
  crUseRootkit: number;
}

interface User {
  userNum: number;
  nickname: string;
}
