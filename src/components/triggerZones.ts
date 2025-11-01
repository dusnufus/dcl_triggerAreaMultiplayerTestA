import { engine, Transform, Entity, TriggerArea, triggerAreaEventsSystem, MeshRenderer, ColliderLayer, Material } from '@dcl/sdk/ecs'

import { GameManager } from '../gameMgr'
import { Vector3, Quaternion, Color4 } from '@dcl/sdk/math'


export function CheckpointTriggerZone(
    _gameMgr: GameManager, 
    _checkpointId: string,
    _pos: Vector3, 
    _scale: Vector3, 
    _respawnPos: Vector3,
    _respawnLookAt: Vector3,
    _debug: boolean = false
): Entity {

    console.log(`CheckpointTriggerZone: creating ${_checkpointId}`)
    var e = engine.addEntity()

    TriggerArea.setBox(e/* , ColliderLayer.CL_PLAYER */)

    Transform.create(e, {
        position: _pos,
        scale: _scale
    })

    if(_debug){
        MeshRenderer.setBox(e)
        if(_checkpointId == "green"){
            Material.setPbrMaterial(e, {
                albedoColor: Color4.Green(),
            })
        }
        else if(_checkpointId == "blue"){
            Material.setPbrMaterial(e, {
                albedoColor: Color4.Blue(),
            })
        }
        else if(_checkpointId == "yellow"){
            Material.setPbrMaterial(e, {
                albedoColor: Color4.Yellow(),
            })
        }
        else{
            Material.setPbrMaterial(e, {
                albedoColor: Color4.White(),
            })
        }
    }

    // Event when trigger area activated
    triggerAreaEventsSystem.onTriggerEnter(e, (r) => {
        // Only update if this isn't already the current checkpoint
        if (_gameMgr.playerMgr.currentCheckpoint !== _checkpointId) {
            console.log(`CheckpointTriggerZone: ${_checkpointId} activated`)
            _gameMgr.playerMgr.setCheckpoint(_checkpointId, _respawnPos, _respawnLookAt)
        }
    })

    return e
}

export function FallTriggerZone(_gameMgr: GameManager, _pos: Vector3, _scale: Vector3, _debug: boolean = false): Entity{

    console.log("FallTriggerZone: constructor running")
    var e = engine.addEntity()

    TriggerArea.setBox(e/* , ColliderLayer.CL_PLAYER */)

    Transform.create(e, {
        position: _pos,
        scale: _scale
    })

    if(_debug){
        MeshRenderer.setBox(e)
        Material.setPbrMaterial(e, {
            albedoColor: Color4.Red(),
        })
    }

    // Event when trigger area activated (player fell)
    triggerAreaEventsSystem.onTriggerEnter(e, (r) => {
        console.log("FallTriggerZone: player fell, respawning at checkpoint")
        _gameMgr.playerMgr.respawnAtCheckpoint()
        
        // Optional: Show a message to the player
        //_gameMgr.showMessage("Respawning at checkpoint...")
    })

    return e
}