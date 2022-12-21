import * as app_component from "@app/app.component"
// @ponicode
describe("onToggleSideBar", () => {
    let inst: any

    beforeEach(() => {
        inst = new app_component.AppComponent()
    })

    test("0", () => {
        let callFunction: any = () => {
            inst.onToggleSideBar()
        }
    
        expect(callFunction).not.toThrow()
    })
})
