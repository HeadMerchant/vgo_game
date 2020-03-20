import {World} from "ecsy";
import {CameraSystem} from "../systems/CameraSystem";
import {SceneSystem} from "../systems/SceneSystem";
import {SceneGraphObject3DComponent, SceneGraphSystem} from "../systems/SceneGraphSystem";
import {TransformSystem} from "../systems/TransformSystem";
import {WebGLRendererContextComponent, WebGLRendererSystem} from "../systems/WebGLRendererSystem";
import {CubeControllerSystem} from "../systems/CubeControllerSystem";
import {RendererComponent} from "../components/RendererComponent";
import {RenderPassComponent} from "../components/RenderPassComponent";
import {Object3DComponent} from "../components/Object3DComponent";
import {MaterialComponent} from "../components/MaterialComponent";
import {Geometries, GeometryComponent} from "../components/GeometryComponent";
import {TransformComponent} from "../components/TransformComponent";
import {CameraComponent} from "../components/CameraComponent";
import {CubeControllerComponent, Keybindings} from "../components/CubeControllerComponent";
import {ParentComponent} from "../components/ParentComponent";
import {Color, Geometry, Vector3} from "three";
import {ActiveComponent} from "../components/ActiveComponent";
import {SceneComponent} from "../components/SceneComponent";
import {BasicPhysicsMovementComponent} from "../components/BasicPhysicsMovementComponent";
import {BasicPhysicsSystem} from "../systems/BasicPhysicsSystem";
import {OrbitComponent} from "../components/OrbitComponent";
import {OrbitSystem} from "../systems/OrbitSystem";

export function CubeWorld() {
    var world = new World();
    world
        .registerSystem(CameraSystem)
        .registerSystem(SceneSystem)
        .registerSystem(SceneGraphSystem)
        .registerSystem(CubeControllerSystem)
        .registerSystem(TransformSystem)
        .registerSystem(BasicPhysicsSystem)
        .registerSystem(OrbitSystem)
        .registerSystem(WebGLRendererSystem)
    world
        .registerComponent(RendererComponent)
        .registerComponent(WebGLRendererContextComponent)
        .registerComponent(RenderPassComponent)
        .registerComponent(SceneGraphObject3DComponent)
        .registerComponent(Object3DComponent)
        .registerComponent(MaterialComponent)
        .registerComponent(GeometryComponent)
        .registerComponent(TransformComponent)
        .registerComponent(CameraComponent)
        .registerComponent(CubeControllerComponent)
        .registerComponent(ParentComponent)
        .registerComponent(BasicPhysicsMovementComponent)
        .registerComponent(OrbitComponent)


    let renderer = world.createEntity()
        .addComponent(RendererComponent)

    const WORLD_HEIGHT = 100;

    let camera = world.createEntity()
        .addComponent(CameraComponent, {
            aspect: window.innerWidth / window.innerHeight,
            worldHeight: WORLD_HEIGHT,
            isOrthographic: true
        })
        .addComponent(ActiveComponent);

    let scene = world.createEntity()
        .addComponent(SceneComponent)

    let renderPass = world.createEntity()
        .addComponent(RenderPassComponent, {
            scene,
            camera
        });

    let p1 = world.createEntity()
        .addComponent(Object3DComponent)
        .addComponent(MaterialComponent, {
            color: new Color(0.8, 0.9, 0.1)
        })
        .addComponent(GeometryComponent)
        .addComponent(TransformComponent, {
            scale: new Vector3(10, 10, 10)
        })
        .addComponent(ParentComponent, {
            parentObject: scene
        })
        .addComponent(CubeControllerComponent, {
            keybindings: {
                down: 'ArrowDown',
                left: 'ArrowLeft',
                up: 'ArrowUp',
                right: 'ArrowRight',
            }
        })
        .addComponent(BasicPhysicsMovementComponent, {
            position: new Vector3(20, 50, -10),
            friction: 1.2
        })
    ;

    let p2 = world.createEntity()
        .addComponent(Object3DComponent)
        .addComponent(MaterialComponent, {
            color: new Color(0.1, 0.9, 0.2)
        })
        .addComponent(GeometryComponent)
        .addComponent(TransformComponent, {
            scale: new Vector3(10, 10, 10)
        })
        .addComponent(ParentComponent, {
            parentObject: scene
        })
        .addComponent(CubeControllerComponent, {
            keybindings: {
                down: 's',
                left: 'a',
                up: 'w',
                right: 'd',
            }
        })
        .addComponent(BasicPhysicsMovementComponent, {
            position: new Vector3(80, 50, -10),
            friction: 1.2
        })


    for(let i = 0; i < 300; i++){
        let sparkle = world.createEntity()
            .addComponent(Object3DComponent)
            .addComponent(MaterialComponent, {
                color: new Color(Math.random(), 0.6, 0.6)
            })
            .addComponent(GeometryComponent,{
                geometry: Geometries.SPHERE
            })
            .addComponent(TransformComponent, {
                position: new Vector3((Math.random()) * 100 + 50, (Math.random()) * 100, Math.random() * 20 + -50),
                scale: new Vector3(2, 2, 2)
            })
            .addComponent(ParentComponent, {
                parentObject: scene
            })
            .addComponent(OrbitComponent)
            .addComponent(CubeControllerComponent, {
                keybindings: {
                    down: 's',
                    left: 'a',
                    up: 'w',
                    right: 'd',
                }
            })

    }



    return world;
}