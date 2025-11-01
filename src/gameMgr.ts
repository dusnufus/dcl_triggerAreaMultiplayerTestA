

import {engine, Entity, GltfContainer, Transform} from '@dcl/sdk/ecs'
import {Vector3, Quaternion, Color4} from '@dcl/sdk/math'

import { CheckpointTriggerZone, FallTriggerZone} from './components/triggerZones'
import { PlayerManager } from './playerMgr'

import { movePlayerTo } from '~system/RestrictedActions'

import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { uiSetup } from './ui'


export class GameManager{

	playerMgr: PlayerManager

    worldEntity: Entity

    greenTriggerZone: Entity
    blueTriggerZone: Entity
    yellowTriggerZone: Entity

    fallTriggerZone: Entity

    messageText: string = "nothing"
    
	constructor(){

        //playerMgr reference
        this.playerMgr = new PlayerManager(this)

        //create the static world elements
        this.worldEntity = engine.addEntity()
        GltfContainer.create(this.worldEntity, {
            src: "models/triggerTestParts_testWorldA.gltf"
        })
        Transform.create(this.worldEntity, {
            position: Vector3.create(8,0,8),
            scale: Vector3.create(1,1,1),
            rotation: Quaternion.fromEulerDegrees(0,180,0)
        })

        this.greenTriggerZone = CheckpointTriggerZone(this, "green", Vector3.create(19,2,28), Vector3.create(8,4,4), Vector3.create(28,0,28), Vector3.create(8,5,8), true)
        this.blueTriggerZone = CheckpointTriggerZone(this, "blue", Vector3.create(15,2,-12), Vector3.create(8,4,4), Vector3.create(6,0,-12), Vector3.create(8,5,8), true)
        this.yellowTriggerZone = CheckpointTriggerZone(this, "yellow", Vector3.create(28,2,8), Vector3.create(4,4,8), Vector3.create(28,0,-1), Vector3.create(8,5,8), true)

        this.fallTriggerZone = FallTriggerZone(this, Vector3.create(-8,4,-6), Vector3.create(15,8,19), true)

        uiSetup(this)

    }
    
}